import { prisma } from "../config";
import {
  BusinessEntityType,
  LocationFiles,
  BusinessEntitiesMainInfo,
  LocationType,
} from "../types";
import { createLocations } from "./location.service";
import { createServicesLinks } from "./services.service";
import { averageRatingByEntity } from "./rating.service";
import {
  BusinessEntityStatus,
  UserProfileType,
  FileLInkType,
} from "../constants";
import { Location } from "@prisma/client";

export const createBusiness = async (
  businessEntity: BusinessEntityType,
  files: LocationFiles
) => {
  const { name, description, locations, services } = businessEntity;

  const createdBusinessEntity = await prisma.businessEntity.create({
    data: { name, description, status: BusinessEntityStatus.Pending },
  });

  await createLocations({
    locations,
    businessEntityId: createdBusinessEntity.id,
    files,
  });

  const servicesLinks = services?.map((service) => ({
    ...service,
    businessEntityId: createdBusinessEntity.id,
  }));

  createServicesLinks(servicesLinks);

  return createdBusinessEntity.id;
};

export const getBusinessesStatusesCount = async () => {
  const result = await prisma.businessEntity.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const formattedResult = result.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));

  return formattedResult;
};

export const businessEntitiesInfo = async () => {
  const result = await prisma.businessEntity.findMany({
    select: {
      name: true,
      status: true,
      userProfiles: {
        where: {
          userProfileType: {
            code: UserProfileType.BUSINESS_OWNER,
          },
        },
        select: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              contact: true,
            },
          },
        },
      },
      locations: {
        select: {
          name: true,
        },
      },
    },
  });
  return result;
};

export const entityById = async (id: number) => {
  const entity = await prisma.businessEntity.findUnique({
    where: {
      id: id,
    },
    include: {
      userProfiles: {
        where: {
          userProfileType: {
            code: UserProfileType.BUSINESS_OWNER,
          },
        },
        select: {
          user: true,
        },
      },
      locations: true,
      businessEntityServiceLinks: {
        select: {
          service: true,
          duration: true,
          price: true,
        },
      },
      _count: {
        select: { appointments: true },
      },
    },
  });

  if (!entity) {
    return;
  }

  const avgRating = await averageRatingByEntity(id);

  const locationsWithFileUrl = await Promise.all(
    entity.locations.map(async (location: Location) => {
      const fileLinks: { file: { url: string } | null }[] =
        await prisma.fileLink.findMany({
          where: {
            linkedType: FileLInkType.Location,
            linkedId: location.id.toString(),
          },
          select: {
            file: { select: { url: true } }, // safer select
          },
        });

      const fileUrls = fileLinks
        .map((fileLink) => fileLink.file?.url)
        .filter((url): url is string => Boolean(url));

      return { ...location, urls: fileUrls };
    })
  );

  return {
    ...entity,
    locations: locationsWithFileUrl,
    avgRating: avgRating || 0.0,
  };
};

export const changeStatus = async (id: number, status: string) => {
  const suspendedEntity = await prisma.businessEntity.update({
    where: {
      id: id,
    },
    data: { status: status },
  });

  return suspendedEntity;
};

export const businessEntitiesAdminGridData = async () => {
  const businesses = await prisma.$queryRaw<BusinessEntitiesMainInfo[]>`
    SELECT 
      be.id AS business_id,
      be.name AS business_name,
      CONCAT(u."firstName", ' ', u."lastName") AS owner_name,
      be."createdAt" AS business_created_at,
      COUNT(DISTINCT besl.id)::int AS no_of_services,
      u.email AS owner_email,
      u.contact AS owner_contact,
      COALESCE(AVG(r.rating), 0)::float AS average_rating,
      COUNT(DISTINCT a.id)::int AS total_bookings,
      be.status AS status,
      JSON_AGG(DISTINCT l.address) AS location_addresses
      FROM "BusinessEntity" be
      JOIN "UserProfile" up ON up."businessEntityId" = be.id
      JOIN "User" u ON u.id = up."userId"
      JOIN "BusinessEntityServiceLink" besl ON besl."businessEntityId" = be.id
      LEFT JOIN "Rating" r ON r."businessEntityId" = be.id
      LEFT JOIN "Appointment" a ON a."businessEntityId" = be.id
      JOIN "Location" l ON l."businessEntityId" = be.id
      GROUP BY be.id, be.name, be."createdAt", u."firstName", u."lastName", u.email, up.status, u.contact;
    `;

  return businesses;
};

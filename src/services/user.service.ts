import { prisma } from "../config";
import { createBusiness } from "./business.service";
import { BusinessEntityType, LocationFiles } from "../types";
import { ModelStatus, UserProfileType } from "../constants";

export const registerUserProfile = async ({
  userId,
  userProfileTypeCode,
  businessEntity,
  files,
}: {
  userId: number;
  userProfileTypeCode: string;
  businessEntity?: BusinessEntityType;
  files: LocationFiles;
}) => {
  const userProfileType = await prisma.userProfileType.findFirst({
    where: { code: userProfileTypeCode },
    select: { id: true },
  });

  let businessEntityId = businessEntity?.id;

  if (
    !!businessEntity &&
    userProfileTypeCode === UserProfileType.BUSINESS_OWNER
  ) {
    businessEntityId = await createBusiness(businessEntity, files);
  }

  const createdUserProfile =
    !!userProfileType?.id &&
    (await prisma.userProfile.create({
      data: {
        userId,
        businessEntityId,
        userProfileTypeId: userProfileType.id,
        status:
          userProfileTypeCode ==
          (UserProfileType.BUSINESS_OWNER || UserProfileType.MANAGER)
            ? ModelStatus.InActive
            : ModelStatus.Active,
      },
    }));

  return createdUserProfile;
};

export const getActiveUsersCount = async () => {
  const activeUserCount = await prisma.user.count({
    where: {
      userProfiles: {
        some: {
          status: "active",
          userProfileType: {
            code: "CL",
          },
        },
      },
    },
  });

  return activeUserCount;
};

export const listAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      contact: true,
      email: true,
      userProfiles: {
        select: {
          status: true,
          userProfileTypeId: true,
          businessEntity: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return users;
};

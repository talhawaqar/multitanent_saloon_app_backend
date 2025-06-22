import { prisma } from "../config";
import { LocationType } from "../types";

export const createLocations = async ({
  locations,
  businessEntityId,
}: {
  locations: LocationType[];
  businessEntityId: number;
}) => {
  const locationsArray = locations.map((location: LocationType) => ({
    ...location,
    businessEntityId,
  }));
  prisma.location.createMany({ data: locationsArray });
};

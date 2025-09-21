import { prisma } from "../config";
import { LocationFiles, LocationType } from "../types";

export const createLocations = async ({
  locations,
  businessEntityId,
  files,
}: {
  locations: LocationType[];
  businessEntityId: number;
  files: LocationFiles;
}) => {
  await Promise.all(
    locations.map(async (location, index) => {
      const createdLocation = await prisma.location.create({
        data: {
          name: location.name,
          address: location.address,
          contact: location.contact,
          businessEntityId,
        },
      });

      const locationFiles = files[`images_location_${index}`] || [];

      await Promise.all(
        locationFiles.map(async (file) => {
          const createdFileData = await prisma.file.create({
            data: {
              url: file.path,
              fileName: file.filename,
              mimeType: file.mimetype,
              size: file.size,
            },
          });

          await prisma.fileLink.create({
            data: {
              fileId: createdFileData.id,
              linkedType: "Location",
              linkedId: createdLocation.id.toString(),
            },
          });
        })
      );
    })
  );
};

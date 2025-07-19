import { prisma } from "../config";
import { createBusiness } from "./business.service";
import { BusinessEntityType } from "../types";
import { UserProfileType } from "../constants";

export const registerUserProfile = async ({
  userId,
  userProfileTypeCode,
  businessEntity,
}: {
  userId: number;
  userProfileTypeCode: string;
  businessEntity?: BusinessEntityType;
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
    businessEntityId = await createBusiness(businessEntity);
  }

  if (!!userProfileType?.id) {
  }

  const createdUserProfile =
    !!userProfileType?.id &&
    (await prisma.userProfile.create({
      data: {
        userId,
        businessEntityId,
        userProfileTypeId: userProfileType.id,
        status: "A",
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

import { prisma } from "../config";
import {createBusiness} from './business.service'
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
  const userProfileTypeId = await prisma.userProfileType.findFirst({
    where: { code: userProfileTypeCode },
    select: { id: true },
  });

  let businessEntityId;
  if (!!businessEntity?.id) {
    switch (userProfileTypeCode) {
      case UserProfileType.MANAGER:
        businessEntityId = businessEntity?.id;
        break;
      case UserProfileType.BUSINESS_OWNER:
        businessEntityId = createBusiness(businessEntity)
        break;
    }
  }

  const createdUserProfile = await prisma.userProfile.create({
    data: { userId, businessEntityId, userProfileTypeId, status: 'A' },
  });
};

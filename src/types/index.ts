import { Moment } from "moment";

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  createdAt: Moment;
  updatedAt: Moment;
};

export type ServiceLinkType = {
  serviceId: number;
  price: number;
  businessEntityId: number;
  duration: number;
};

export type LocationType = {
  id: number;
  name: string;
  address: string;
  contact: string;
  businessEntityid: number;
};

export type BusinessEntityType = {
  id: number;
  name: string;
  description: string;
  services: ServiceLinkType[];
  locations: LocationType[];
};

export type ServiceType = {
  id: number;
  name: string;
  status: string;
  categoryId: number;
  description: string;
};

export type CategoryType = {
  id: number;
  name: string;
  status: string;
  description: string;
};

export type LocationFiles = {
  [fieldname: string]: Express.Multer.File[];
};

export type BusinessEntitiesMainInfo = {
  business_id: number;
  business_name: string;
  owner_name: string;
  business_created_at: Date;
  no_of_services: number;
  owner_email: string;
  average_rating: number;
  total_bookings: number;
  entity_status: string;
  owner_contact: string;
  location_addresses: string[];
};

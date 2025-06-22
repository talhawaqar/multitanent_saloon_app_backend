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
  services: ServiceLinkType[];
  locations: LocationType[];
};

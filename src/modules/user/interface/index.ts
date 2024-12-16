import { Types } from "mongoose";
import { CityEnum } from "src/enums/enum/city.enum";
import { UserRoleEnum } from "src/enums/enum/userRole.enum";

export interface IUser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  birthDate?: string;
  phone?: number;
  email: string;
  password: string;
  country?: string;
  address?: string;
  city?: CityEnum;
  postalCode?: number;
  role?: UserRoleEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

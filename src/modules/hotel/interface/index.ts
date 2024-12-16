import { Types } from "mongoose";
import { CityEnum } from "src/enums/enum/city.enum";

interface Rating {
  userId: Types.ObjectId;
  rating: number; // Should be between 1 and 5
}

export interface Hotel {
  name: string;
  bedroom: number;
  address: string;
  carpetArea: string;
  bathroom: number;
  city: CityEnum;
  image: string[];
  postalCode: string;
  owner: Types.ObjectId;
  hasWifi?: boolean;
  price?: number;
  location?: [number, number];
  ratings?: Rating[];
  averageRating?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

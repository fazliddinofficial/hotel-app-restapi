import { Types } from "mongoose";

export interface RoomType {
  propertyName: string;
  bedRoom: number;
  bathroom: number;
  imgs: string[];
  hotel: typeof Types.ObjectId;
  isRented: boolean;
}

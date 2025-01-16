import { Types } from "mongoose";

export interface RoomType {
  propertyName: string;
  bedRoom: number;
  bathroom: number;
  imgs: string[];
  hotelId: typeof Types.ObjectId;
  isRented: boolean;
  price: number;
  description: string
  guestsNumber: number
  hasWifi: boolean
}

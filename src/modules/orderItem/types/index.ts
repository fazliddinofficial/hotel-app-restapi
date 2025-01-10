import { Types } from "mongoose";

export enum PaymentTypeEnum {
  card = "card",
  cash = "cash",
  debt = "debt",
}

export type OrderItemType = {
  fullName: string
  email: string;
  phone: string;
  startingDate: Date;
  endingDate: Date;
  numberOfGuests: number;
  paymentType: PaymentTypeEnum;
  orderedRoom: typeof Types.ObjectId; 
  roomId: typeof Types.ObjectId;
}

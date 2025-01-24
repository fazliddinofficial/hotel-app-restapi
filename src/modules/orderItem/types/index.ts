import { Types } from "mongoose";

export enum PaymentTypeEnum {
  card = "card",
  cash = "cash",
  debt = "debt",
}

export enum OrderStatus {
  pending = "pending",
  confirmed = "confirmed"
}

export type OrderItemType = {
  fullName: string
  userId: typeof Types.ObjectId;
  status: OrderStatus;
  email: string;
  phone: string;
  startingDate: Date;
  endingDate: Date;
  numberOfGuests: number;
  paymentType: PaymentTypeEnum;
  roomId: typeof Types.ObjectId;
}

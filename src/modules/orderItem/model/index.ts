import { model, Schema, Types } from "mongoose";
import { OrderItemType, OrderStatus, PaymentTypeEnum } from "../types";
import { MODELS } from "src/constants/models";

const orderItemSchema = new Schema<OrderItemType>(
  {
    userId: {
      type: Types.ObjectId,
      ref: MODELS.USER,
      required: true
    },
    status: {
      type: String,
      enum: Object.keys(OrderStatus),
      default: OrderStatus.pending
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentTypeEnum),
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
    },
    endingDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderItem = model(MODELS.ORDER_ITEM, orderItemSchema);

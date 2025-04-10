import { model, Schema, Types } from "mongoose";
import { MODELS } from "src/constants/models";
import { CityEnum } from "src/enums/enum/city.enum";
import { UserRoleEnum } from "src/enums/enum/userRole.enum";

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: String },
    phone: { type: Number },
    email: { type: String, required: true },
    password: { type: String, required: true },
    country: { type: String, default: "Uzb" },
    address: { type: String },
    city: { type: String, enum: CityEnum },
    postalCode: { type: Number },
    role: {
      type: String,
      enum: UserRoleEnum,
      default: MODELS.USER,
    },
    order: {
      type: Types.ObjectId,
      ref: MODELS.ORDER_ITEM,
    },
  },
  { timestamps: true }
);

export const User = model(MODELS.USER, userSchema);

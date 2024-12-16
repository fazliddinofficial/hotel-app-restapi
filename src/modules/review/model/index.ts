import { model, Schema, Types } from "mongoose";
import { MODELS } from "src/constants/models";

const reviewSchema = new Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: Types.ObjectId, ref: MODELS.USER, required: true },
    hotelId: { type: Types.ObjectId, ref: MODELS.HOTEL, required: true },
  },
  { timestamps: true }
);

export const Review = model("Review", reviewSchema);

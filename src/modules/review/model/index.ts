import { model, Schema, Types } from "mongoose";
import { MODELS } from "src/constants/models";

const reviewSchema = new Schema(
  {
    review: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: Types.ObjectId, ref: MODELS.USER, required: false },
    hotelId: { type: Types.ObjectId, ref: MODELS.HOTEL, required: false },
  },
  { timestamps: true }
);

export const Review = model(MODELS.REVIEW, reviewSchema);

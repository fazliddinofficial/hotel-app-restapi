import { model, Schema, Types } from "mongoose";
import { MODELS } from "src/constants/models";

const favoriteHotelSchema = new Schema(
  {
    hotel: {
      type: [Types.ObjectId],
      ref: MODELS.HOTEL,
      required: true,
    },
  },
  { timestamps: true },
);

export const FavoriteHotel = model(MODELS.FAVORITE_HOTEL, favoriteHotelSchema);

import { model, Schema, Types } from "mongoose";
import { MODELS } from "src/constants/models";
import { CityEnum } from "src/enums/city.enum";

const hotelSchema = new Schema(
  {
    name: { type: String, required: true },
    bedroom: { type: Number, required: true },
    address: { type: String, required: true },
    carpetArea: { type: String, required: true },
    bathroom: { type: Number, required: true },
    city: { type: String, enum: CityEnum, required: true },
    image: [{ type: String, required: true }],
    postalCode: { type: String, required: true },
    owner: { type: Types.ObjectId, required: true, ref: MODELS.USER },
    hasWifi: { type: Boolean },
    price: { type: Number },
    location: { type: [Number, Number] },
    ratings: [
      {
        userId: { type: Types.ObjectId, ref: MODELS.USER },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Hotel = model(MODELS.HOTEL, hotelSchema);

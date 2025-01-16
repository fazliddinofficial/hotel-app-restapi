import { Schema, Types, model } from "mongoose";

import { RoomType } from "../types";
import { MODELS } from "src/constants/models";

const roomSchema = new Schema<RoomType>(
  {
    propertyName: {
      type: String,
      required: true,
    },
    bedRoom: {
      type: Number,
      default: 0,
    },
    bathroom: {
      type: Number,
      default: 0,
    },
    imgs: [
      {
        type: String,
      },
    ],
    hotelId: {
      type: Types.ObjectId,
      ref: MODELS.HOTEL,
      required: true,
    },
    isRented: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true
    },
    description: String,
    guestsNumber: Number,
    hasWifi: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true },
);

export const Room = model(MODELS.ROOM, roomSchema);

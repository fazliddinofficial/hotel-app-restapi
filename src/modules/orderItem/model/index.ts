import { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true },
);

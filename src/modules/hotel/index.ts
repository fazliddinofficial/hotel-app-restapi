import { Router } from "express";
import multer from "multer";
import { checkUserProperties } from "../auth";
import {
  createHotel,
  deleteHotelById,
  getHotelById,
  updateHotelById,
  uploadPicture,
} from "./hotel.handler";
const upload = multer({ dest: "uploads/" });

export const hotelRoute = Router();

hotelRoute.post("/create", checkUserProperties, createHotel);

hotelRoute.get("/:id", getHotelById);

hotelRoute.put("/:id", checkUserProperties, updateHotelById);

hotelRoute.delete("/:id", checkUserProperties, deleteHotelById);

hotelRoute.post(
  "/upload/picture",
  (req, res, next) => {
    next();
  },
  upload.single("file"),
  uploadPicture
);

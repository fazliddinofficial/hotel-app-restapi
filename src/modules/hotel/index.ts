import { Router } from "express";
import { checkUserProperties } from "../auth";
import {
  createHotel,
  deleteHotelById,
  getHotelById,
  updateHotelById,
} from "./hotel.handler";

export const hotelRoute = Router();

hotelRoute.post("/create", checkUserProperties, createHotel);

hotelRoute.get("/:id", getHotelById);

hotelRoute.put("/:id", checkUserProperties, updateHotelById);

hotelRoute.delete("/:id", checkUserProperties, deleteHotelById);

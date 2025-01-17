import { Router } from "express";
import { checkUserProperties } from "../auth";
import {
  createHotel,
  deleteHotelById,
  filteredHotels,
  getAllHotels,
  getHotelById,
  updateHotelById,
} from "./hotel.handler";

export const hotelRoute = Router();

hotelRoute.post("/create", createHotel);

hotelRoute.get("/find/:id", getHotelById);

hotelRoute.put("/:id", checkUserProperties, updateHotelById);

hotelRoute.delete("/:id", checkUserProperties, deleteHotelById);

hotelRoute.get("/all-get", getAllHotels)

hotelRoute.get('/filter', filteredHotels)
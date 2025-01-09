import express, { Router } from "express";
import {
  addHotelToFavorite,
  getAllFavoriteHotels,
  removeFavoriteHotelFromFavorites,
} from "./handlers";

const app = express();

app.use(express.json());

export const favoriteHotelRoute = Router();

favoriteHotelRoute.post("/hotel/:id", addHotelToFavorite);
favoriteHotelRoute.get("/hotels", getAllFavoriteHotels);
favoriteHotelRoute.delete("/hotel/:id", removeFavoriteHotelFromFavorites);

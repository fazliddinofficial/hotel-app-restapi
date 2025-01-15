import express, { Router } from "express";
import {
  addHotelToFavorite,
  getAllFavoriteHotels,
  getAllHotels,
  removeFavoriteHotelFromFavorites,
} from "./handlers";

const app = express();

app.use(express.json());

export const favoriteHotelRoute = Router();

favoriteHotelRoute.post("/create", addHotelToFavorite);
favoriteHotelRoute.get("/hotels", getAllHotels);
favoriteHotelRoute.get("/find/:id", getAllFavoriteHotels);
favoriteHotelRoute.delete("/hotel/:id", removeFavoriteHotelFromFavorites);

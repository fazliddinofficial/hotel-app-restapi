import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import { hotelRoute } from "./modules/hotel";
import { reviewRoute } from "./modules/review";
import { userRoute } from "./modules/user";
import { favoriteHotelRoute } from "./modules/favoriteHotel";
import { roomRoute } from "./modules/room";
import { orderItemRoute } from "./modules/orderItem";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
app.use(cors({}));
app.use(express.json());

app.use("/hotel", hotelRoute);
app.use("/review", reviewRoute);
app.use("/user", userRoute);
app.use("/favorite", favoriteHotelRoute);
app.use("/room", roomRoute);
app.use("/order", orderItemRoute)

app.get("/", (req, res) => {
  res.status(200).send("This is main page");
});

mongoose
  .connect(<string>process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDb connected"));

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});

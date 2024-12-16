import { Router } from "express";
import { Hotel } from "./model/hotel.model";
import hotelJoiSchema from "./validation";

export const hotelRoute = Router();

hotelRoute.post("/create", async (req, res): Promise<any> => {
  const { error, value } = hotelJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`Error during creating hotel! ${error}`);
  }
  const createdHotel = await Hotel.create(req.body);

  res.status(201).json(createdHotel);
});

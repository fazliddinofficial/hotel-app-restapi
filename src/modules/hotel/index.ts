import { Router } from "express";
import { Hotel } from "./model/hotel.model";
import hotelJoiSchema from "./validation";

export const hotelRoute = Router();

hotelRoute.post("/create", async (req, res): Promise<any> => {
  const { error, value } = hotelJoiSchema.validate(req.body);
  if (error) {
    return res.status(400).send(`Error during creating hotel! ${error}`);
  }
  const createdHotel = await Hotel.create(value);

  res.status(201).json(createdHotel);
});

hotelRoute.get("/:id", async (req, res): Promise<any> => {
  const foundHotel = await Hotel.findById(req.params.id);
  if (!foundHotel) {
    return res.status(404).send("Hotel not found!");
  }
  res.status(200).json(foundHotel);
});

hotelRoute.put("/:id", async (req, res): Promise<any> => {
  const updates = req.body;
  const { id } = req.params;
  const foundHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
  if (!foundHotel) {
    return res.status(404).send("Hotel not found!");
  }
  res.status(200).json(foundHotel);
});

hotelRoute.delete("/:id", async (req, res): Promise<any> => {
  const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
  if (!deletedHotel) {
    return res.status(404).send("Hotel not found!");
  }
  res.status(200).send("Hotel has been deleted!");
});

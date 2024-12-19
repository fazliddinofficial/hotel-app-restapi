import { Router } from "express";
import { ERROR_MESSAGES } from "src/constants/errors";
import { checkUserProperties } from "../auth";
import { Hotel } from "./model/hotel.model";
import hotelJoiSchema from "./validation";

export const hotelRoute = Router();

hotelRoute.post(
  "/create",
  // checkUserProperties,
  async (req, res): Promise<any> => {
    try {
      const { error, value } = hotelJoiSchema.validate(req.body);
      if (error) {
        return res.status(400).send(`Error during creating hotel! ${error}`);
      }
      const createdHotel = await Hotel.create(value);

      res.status(201).json(createdHotel);
    } catch (error) {
      res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
);

hotelRoute.get("/:id", async (req, res): Promise<any> => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    if (!foundHotel) {
      return res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
    }
    res.status(200).json(foundHotel);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

hotelRoute.put("/:id", checkUserProperties, async (req, res): Promise<any> => {
  try {
    const updates = req.body;
    const { id } = req.params;
    const foundHotel = await Hotel.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!foundHotel) {
      return res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
    }
    res.status(200).json(foundHotel);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

hotelRoute.delete(
  "/:id",
  checkUserProperties,
  async (req, res): Promise<any> => {
    try {
      const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
      if (!deletedHotel) {
        return res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
      }
      res.status(200).send("Hotel has been deleted!");
    } catch (error) {
      res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
);

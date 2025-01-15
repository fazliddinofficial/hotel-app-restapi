import { ERROR_MESSAGES } from "src/constants/errors";
import { FavoriteHotel } from "../model";
import { Request, Response } from "express";

export const addHotelToFavorite = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const foundData = await FavoriteHotel.exists({...body})

    if (foundData) {
      await FavoriteHotel.findByIdAndDelete(foundData._id);
      res.status(200).send('Successfully removed from favorites!');
      return;
    }

    const foundHotel = await FavoriteHotel.create({ ...body });

    if (!foundHotel) {
      res.status(404).send("Hotel not found!");
      return;
    }

    res.status(201).send("Hotel add to favorites successfully!");
  } catch ({ message }) {
    throw new Error(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, ${message}`);
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const foundAllHotel = await FavoriteHotel.find({}).populate("hotel");

    res.status(200).json(foundAllHotel);
  } catch ({ message }) {
    throw new Error(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, ${message}`);
  }
};

export const getAllFavoriteHotels = async (req: Request, res) => {
  try {
    const { id } = req.params;
    const foundAllHotel = await FavoriteHotel.find({ user: id }).populate(
      "hotel"
    );

    res.status(200).json(foundAllHotel);
  } catch ({ message }) {
    throw new Error(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, ${message}`);
  }
};

export const removeFavoriteHotelFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const removedHotel = await FavoriteHotel.findByIdAndDelete(id);

    if (!removedHotel) {
      res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    res.status(200).send("Hotel removed from favorites successfully!");
  } catch ({ message }) {
    throw new Error(`${ERROR_MESSAGES.INTERNAL_SERVER_ERROR}, ${message}`);
  }
};

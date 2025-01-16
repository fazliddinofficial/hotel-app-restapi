import { ERROR_MESSAGES } from "src/constants/errors";
import { Room } from "../model";
import hotelJoiSchema from "src/modules/hotel/validation";
import { RoomType } from "../types";

export const createRoom = async (req, res) => {
  try {
    const createdRoom = await Room.create(req.body);
    console.log(req.body)
    res.status(201).send(createdRoom);
  } catch ({ message }) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + message);
  }
};

export const getRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const foundRoom = await Room.find({hotelId: id});

    if (!foundRoom) {
      res.status(404).send("Room" + ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    res.status(200).json(foundRoom);
  } catch ({ message }) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + message);
  }
};

export const updateRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedRoom = await Room.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!updatedRoom) {
      res.status(404).send("Room" + ERROR_MESSAGES.NOT_FOUND);
    }

    res.status(200).json(updatedRoom);
  } catch ({ message }) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + message);
  }
};

export const deleteRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const foundRoom = await Room.findByIdAndDelete(id);

    if (!foundRoom) {
      res.status(404).send("Room" + ERROR_MESSAGES.NOT_FOUND);
    }

    res.status(200).send("Room is deleted successfully!");
  } catch ({ message }) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + message);
  }
};

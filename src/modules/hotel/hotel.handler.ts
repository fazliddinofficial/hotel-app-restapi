import multer from "multer";
import { ERROR_MESSAGES } from "src/constants/errors";
import { Hotel } from "./model/hotel.model";
import hotelJoiSchema from "./validation";

const upload = multer({ dest: "uploads/" });

export const createHotel = async (req, res): Promise<any> => {
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
};

export const getHotelById = async (req, res): Promise<any> => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    if (!foundHotel) {
      return res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
    }
    res.status(200).json(foundHotel);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateHotelById = async (req, res): Promise<any> => {
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
};

export const deleteHotelById = async (req, res): Promise<any> => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      return res.status(404).send("Hotel" + ERROR_MESSAGES.NOT_FOUND);
    }
    res.status(200).send("Hotel has been deleted!");
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const uploadPicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    res.status(200).send("Upload successful");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

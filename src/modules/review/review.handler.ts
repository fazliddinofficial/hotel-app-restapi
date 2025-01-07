import { ERROR_MESSAGES } from "src/constants/errors";
import { Review } from "./model";
import reviewJoiSchema from "./validator";
import {Request, Response} from 'express'

export const createReview = async (req: Request, res: Response): Promise<any> => {
  try {
    const { error, value } = reviewJoiSchema.validate(req.body);

    if (error) {
      res.status(400).send(ERROR_MESSAGES.FILL_FIELDS);
      return;
    }

    const existingReview = await Review.findOne({
      userId: value.userId,
      hotelId: value.hotelId,
    });

    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this hotel.",
      });
    }

    const createdReview = await Review.create(value);
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const updateReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const foundReview = await Review.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!foundReview) {
      res.status(404).send("Review" + ERROR_MESSAGES.NOT_FOUND);
      return;
    }
    res.status(200).json(foundReview);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

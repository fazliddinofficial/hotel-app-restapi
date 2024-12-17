import { Router } from "express";
import { authToken } from "../user";
import { Review } from "./model";
import reviewJoiSchema from "./validator";
export const reviewRoute = Router();

reviewRoute.post("/create", async (req, res): Promise<any> => {
  const { error, value } = reviewJoiSchema.validate(req.body);

  if (error) {
    res.status(400).send("You have to fill all fields!");
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
});

reviewRoute.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const foundReview = await Review.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!foundReview) {
    res.status(404).send("Review is not found!");
    return;
  }
  res.status(200).json(foundReview);
});

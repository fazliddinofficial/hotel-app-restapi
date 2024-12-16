import { Router } from "express";
import { Review } from "./model";
import reviewJoiSchema from "./validator";
export const reviewRoute = Router();

reviewRoute.post("/create", async (req, res): Promise<any> => {
  const { error, value } = reviewJoiSchema.validate(req.body);
  if (error) {
    res.status(400).send("You have to fill all fields!");
    return;
  }
  const createdReview = await Review.create(value);
  res.status(201).json(createdReview);
});

import { Router } from "express";
import { createReview, updateReviewById } from "./review.handler";
export const reviewRoute = Router();

reviewRoute.post("/create", createReview);

reviewRoute.put("/update/:id", updateReviewById);

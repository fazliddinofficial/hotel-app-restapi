import dotenv from "dotenv";
import express, { Router } from "express";
import { checkUserProperties } from "../auth";
import {
  changeUserRoleById,
  getUserById,
  signIn,
  signUp,
} from "./user.handler";
dotenv.config();

const app = express();

app.use(express.json());

export const userRoute = Router();

userRoute.get("/:id", getUserById);

userRoute.post("/signUp", signUp);

userRoute.post("/signIn", signIn);

userRoute.put("/changeRole/:id", checkUserProperties, changeUserRoleById);

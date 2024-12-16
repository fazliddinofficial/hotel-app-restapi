import { Router } from "express";
import { User } from "./model/user.model";
import userJoiSchema from "./validation";

const userRoute = Router();

userRoute.get("/:id", async (req, res): Promise<any> => {
  const foundUser = await User.findById(req.params.id);

  if (!foundUser) {
    return res.status(404).send("User is not found!");
  }

  res.status(200).send(foundUser);
});

userRoute.post("/signUp", async (req, res): Promise<any> => {
  const { error, value } = userJoiSchema.validate(req.body);

  if (error) {
    return res.status(400).send("User is not created!");
  }

  const createdUser = await User.create(value);
  res.status(201).send(createdUser);
});

userRoute.put("/");

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "src/constants/errors";
import { checkUserProperties } from "../auth";
import { User } from "./model/user.model";
import userJoiSchema from "./validation";
dotenv.config();

const app = express();

app.use(express.json());

export const userRoute = Router();

userRoute.get("/:id", async (req, res): Promise<any> => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(404).send("User is not found!");
    }

    res.status(200).send(foundUser);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

userRoute.post("/signUp", async (req, res): Promise<any> => {
  try {
    const { error, value } = userJoiSchema.validate(req.body);

    const foundUser = await User.findOne({ email: value.email });

    if (error) {
      return res.status(400).send(error);
    }

    if (foundUser) {
      return res.status(400).send("User" + ERROR_MESSAGES.IS_ALREADY_EXIST);
    }

    const hashedPassword = await bcrypt.hash(value.password, 8);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

userRoute.post("/signIn", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userRole = req.body.role;

    const foundUser: any = await User.findOne({ email: userEmail })
      .select({
        password: 1,
      })
      .lean();

    if (!foundUser) {
      res.status(404).send("User is not found!");
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      foundUser.password
    );

    if (!isPasswordValid) {
      res.status(400).send("Password is not match!");
    }

    const payload = {
      email: userEmail,
      password: userPassword,
      role: userRole,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res.header("authorization", `Bearer ${accessToken}`);
    res.status(200).json(accessToken);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

userRoute.put("/changeRole/:id", checkUserProperties, async (req, res) => {
  try {
    const updates = req.body;
    const foundUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!foundUser) {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
});

export const authToken =
  (roles = []) =>
  (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) return res.status(401);

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).send("Token is not valid!");
        }
        req.user = user;
        next();
      });
    } catch (error) {
      res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };

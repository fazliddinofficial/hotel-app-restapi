import express, { Router } from "express";
import {
  createRoom,
  deleteRoomById,
  getRoom,
  updateRoomById,
} from "./handlers";

const app = express();

app.use(express.json());

export const roomRoute = Router();

roomRoute.post("/", createRoom);

roomRoute.get("/:id", getRoom);

roomRoute.put("/:id", updateRoomById);

roomRoute.delete("/:id", deleteRoomById);

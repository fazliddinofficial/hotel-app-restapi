import express, {Router} from "express";
import { cancelOrderById, createOrderItem } from "./handlers";

const app = express();
app.use(express.json());

export const orderItemRoute = Router();

orderItemRoute.post("/", createOrderItem);
orderItemRoute.put("/:id", cancelOrderById)
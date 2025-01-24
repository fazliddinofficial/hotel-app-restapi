import express, {Router} from "express";
import { cancelOrderById, confirmOrder, createOrderItem, getAllOrders } from "./handlers";

const app = express();
app.use(express.json());

export const orderItemRoute = Router();

orderItemRoute.post("/", createOrderItem);
orderItemRoute.put("/:id", cancelOrderById);
orderItemRoute.get("/:id", getAllOrders);
orderItemRoute.put("/confirm/:id", confirmOrder)
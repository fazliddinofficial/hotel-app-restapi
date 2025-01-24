import { Request, Response } from "express";
import { ERROR_MESSAGES } from "src/constants/errors";
import { OrderItemType, OrderStatus } from "../types";
import { OrderItem } from "../model";
import { Room } from "src/modules/room/model";
import { User } from "src/modules/user/model/user.model";

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const data: OrderItemType = req.body;

    if (!data) {
      res.status(400).send("All data is required!");
      return;
    }

    const createdOrderItem = await OrderItem.create(data);

    const foundRoom = await Room.findByIdAndUpdate(
      data.roomId,
      { isRented: true },
      { new: true }
    );

    if (!foundRoom) {
      res.status(404).send("Room is not found!");
      return;
    }

    const foundUser = await User.findOneAndUpdate(
      { email: data.email },
      { order: createdOrderItem._id },
      { new: true }
    );

    if (!foundUser) {
      await OrderItem.findByIdAndDelete(createdOrderItem._id);
      res.status(404).send("User" + ERROR_MESSAGES.NOT_FOUND);
      return;
    }

    res.status(201).send({
      message: "Successfully ordered!",
      data: data,
      foundUser,
    });
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

export const cancelOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderItem.findByIdAndDelete({ _id: id });

    if (!deletedOrder) {
      res.status(404).send("Order" + ERROR_MESSAGES.NOT_FOUND);
    }

    res.status(200).send("Order canceled successfully!");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log("came");
    const foundOrders = await OrderItem.find({ userId });

    res.status(200).json(foundOrders);
  } catch (error) {
    throw new Error(error);
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const confirmedOrder = await OrderItem.findByIdAndUpdate(
      orderId,
      { status: OrderStatus.confirmed },
      { new: true }
    );

    if (!confirmedOrder) {
      res.status(404).send("Order not found!");
      return;
    }

    res.status(400).json(confirmedOrder)
  } catch (error) {
    throw new Error(error);
  }
};

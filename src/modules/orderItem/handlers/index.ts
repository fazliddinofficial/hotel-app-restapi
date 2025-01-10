import { Request, Response } from "express";
import { ERROR_MESSAGES } from "src/constants/errors";
import { OrderItemType } from "../types";
import { OrderItem } from "../model";
import { Room } from "src/modules/room/model";
import { User } from "src/modules/user/model/user.model";

export const createOrderItem = async (req: Request, res: Response) => {
  try {
    const data: OrderItemType = req.body;

    if (!data) {
      res.status(400).send("All data is required!");
    }

    const createdOrderItem = await OrderItem.create(data);

    await Room.findByIdAndUpdate(
      data.roomId,
      { isRented: true },
      { new: true }
    );

    const foundUser = await User.findOneAndUpdate(
      { email: data.email },
      { order: createdOrderItem._id },
      { new: true }
    );

    if(!foundUser){
      res.status(404).send("User"+ERROR_MESSAGES.NOT_FOUND)
    }

    res.status(201).send({
      message: "Successfully ordered!",
      data: createdOrderItem,
    });
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR + error);
  }
};

export const cancelOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderItem.findByIdAndDelete({_id: id});

    if (!deletedOrder) {
      res.status(404).send("Order"+ ERROR_MESSAGES.NOT_FOUND)
    }

    res.status(200).send('Order canceled successfully!')
  } catch (error) {
    
  }
}
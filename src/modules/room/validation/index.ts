import Joi from "joi";
import { RoomType } from "../types";

const RoomSchemaJoi: Joi.ObjectSchema<RoomType> = Joi.object({
  propertyName: Joi.string().min(3).max(30).required(),
  bedRoom: Joi.number().integer().min(0).default(0),
  bathroom: Joi.number().integer().min(0).default(0),
  imgs: Joi.array().items(Joi.string()),
  hotel: Joi.string().trim().length(24).hex().required(),
  isRented: Joi.boolean().default(false),
});

export default RoomSchemaJoi;

import Joi from "joi";
import { CityEnum } from "src/enums/city.enum";
import { Hotel } from "../interface";

const hotelJoiSchema: Joi.ObjectSchema<Hotel> = Joi.object({
  name: Joi.string().required(),
  bedroom: Joi.number().integer().required(),
  address: Joi.string().required(),
  carpetArea: Joi.string().required(),
  bathroom: Joi.number().integer().required(),
  city: Joi.string()
    .valid(...CityEnum)
    .required(),
  image: Joi.array().items(Joi.string().uri()),
  postalCode: Joi.string().required(),
  owner: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  hasWifi: Joi.boolean(),
  price: Joi.number().min(0),
  location: Joi.array().length(2).items(Joi.number()),
  ratings: Joi.array().items(
    Joi.object({
      userId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
      rating: Joi.number().min(1).max(5),
    })
  ),
  averageRating: Joi.number().min(0).max(5).default(0),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(new Date()),
});

export default hotelJoiSchema;

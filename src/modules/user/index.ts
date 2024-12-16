import Joi from "joi";
import { CityEnum } from "src/enums/city.enum";
import { UserRoleEnum } from "src/enums/userRole.enum";

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.string().isoDate().optional(),
  phone: Joi.number().integer().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  country: Joi.string().default("Uzb"),
  address: Joi.string().optional(),
  city: Joi.string()
    .valid(...CityEnum)
    .optional(),
  postalCode: Joi.number().integer().optional(),
  role: Joi.string()
    .valid(...UserRoleEnum)
    .default("User"),
  createdAt: Joi.date().default(new Date()),
  updatedAt: Joi.date().default(new Date()),
});

export default userJoiSchema;

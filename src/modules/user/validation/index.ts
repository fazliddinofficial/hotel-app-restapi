import Joi from "joi";
import { MODELS } from "src/constants/models";
import { CityEnum } from "src/enums/city.enum";
import { UserRoleEnum } from "src/enums/userRole.enum";

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  birthDate: Joi.string().optional(),
  phone: Joi.number().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  country: Joi.string().default("Uzb"),
  address: Joi.string().optional(),
  city: Joi.string()
    .valid(...CityEnum)
    .optional(),
  postalCode: Joi.number().optional(),
  role: Joi.string()
    .valid(...UserRoleEnum)
    .default(MODELS.USER),
});

export default userJoiSchema;

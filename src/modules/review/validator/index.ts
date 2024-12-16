import Joi from "joi";
import mongoose from "mongoose";

// Joi validation schema
const reviewJoiSchema = Joi.object({
  review: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5),
  userId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
  hotelId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .required(),
});

// Export the schema
export default reviewJoiSchema;

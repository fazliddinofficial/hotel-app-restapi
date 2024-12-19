import { User } from "../user/model/user.model";

export const checkUserProperties = async (req, res, next) => {
  const userId = req.body.id;
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    return res.status(404).send("User not found!");
  }
  if (foundUser.role === "SuperAdmin" || foundUser.role === "Admin") {
    return next();
  }
  if (!foundUser.role || foundUser.role !== "Admin") {
    return res.status(403).send("You have no permission!");
  }
};

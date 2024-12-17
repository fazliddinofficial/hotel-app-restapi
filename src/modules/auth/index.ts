export const checkUserProperties = (req, res, next) => {
  const user = req.body;
  if (!user) {
    return res.status(404).send("User not found!");
  }
  if (user.role === "superAdmin" || user.role === "Admin") {
    return next();
  }
  if (!user.role || user.role !== "Admin") {
    return res.status(403).send("You have no permisson!");
  }
};

import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("This is main page");
});
mongoose
  .connect(<string>process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDb connected"));

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});

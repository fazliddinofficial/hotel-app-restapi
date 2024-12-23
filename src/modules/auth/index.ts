import { User } from "../user/model/user.model";
import nodeMailer from "nodemailer";

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

const sendCodeToEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).send("User not found!");
    }

    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, "0");

    // Configure nodemailer
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Confirming Code",
      text: `Hello, this is your confirmation code: ${code}`,
    };

    await transporter.sendMail(emailOptions);

    await foundUser.save();

    res.status(200).send("Code sent successfully!");
  } catch (err) {
    console.error(err);
  }
};

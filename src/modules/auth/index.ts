import { generateRandomNumbers } from "src/utils/code";
import { User } from "../user/model/user.model";
import nodeMailer from 'nodemailer'

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

export const sendConfirmationCode = async (req,res): Promise<any> => {
  const email = req.body.email;
  
  const foundEmail = await User.findOne({ email });

  if (!foundEmail) {
    throw new Error('Email not found!');
  }

  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const code = generateRandomNumbers(6);

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Confirming Code',
    text: `Hello, this is your confirming code ${code}`,
  };

  transporter.sendMail(emailOptions, (err, info) => {
    if (err) {
      throw new Error('Error with sending code!');
    }
    console.log(`Email sent ${info}`);
  });
  
  res.status(200).send({code: code});
};
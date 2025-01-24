import bcrypt from "bcrypt";
import { ERROR_MESSAGES } from "src/constants/errors";
import { User } from "./model/user.model";
import userJoiSchema from "./validation";

export const getUserById = async (req, res): Promise<any> => {
  try {
    const foundUser = await User.findById(req.params.id);

    if (!foundUser) {
      return res.status(404).send("User is not found!");
    }

    res.status(200).send(foundUser);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const signUp = async (req, res): Promise<any> => {
  try {
    const { error, value } = userJoiSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error);
    }
    
    const foundUser = await User.findOne({ email: value.email });

    if (foundUser) {
      return res.status(400).send("User" + ERROR_MESSAGES.IS_ALREADY_EXIST);
    }

    const hashedPassword = await bcrypt.hash(value.password, 8);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const signIn = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const foundUser: any = await User.findOne({ email: userEmail })
      .select({
        _id: 1,
        password: 1,
        role: 1,
      })
      .lean();

    if (!foundUser) {
      return res.status(404).send("User is not found!");
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      foundUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).send("Password is not match!");
    }

    const payload = {
      userId: foundUser._id,
      email: userEmail,
      password: userPassword,
      role: foundUser.role,
    };
    
    return res.status(200).json(payload);
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export const changeUserRoleById = async (req, res) => {
  try {
    const updates = req.body;
    const foundUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!foundUser) {
      res.status(404).send("User not found!");
    }
  } catch (error) {
    res.status(500).send(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

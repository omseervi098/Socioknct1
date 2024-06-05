import bcrypt from "bcrypt";
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from "../services/userServices.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/environment.js";
import { OAuth2Client } from "google-auth-library";
import Otp from "../models/Otp.js";
const client = new OAuth2Client(env.googleClientId);
export const googleAuth = async (req, res, next) => {
  const { credential, client_id } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: client_id,
  });
  const payload = ticket.getPayload();
  const { email, name, picture } = payload;
  const user = await getUserByEmail(email);
  if (user) {
    const loginToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    // dont send password in response
    user.password = undefined;
    return res.status(200).json({
      token: loginToken,
      user: {
        id: user._id,
        ...user._doc,
      },
    });
  } else {
    const username = email.split("@")[0];
    const password = bcrypt.hashSync(email, 10);

    const newUser = new User({
      avatar: picture,
      name,
      username,
      email,
      password,
    });
    await createUser(newUser);
    const loginToken = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );
    // dont send password in response
    newUser.password = undefined;
    return res.status(201).json({
      token: loginToken,
      user: {
        id: newUser._id,
        ...newUser._doc,
      },
    });
  }
};
export const creatingUser = async (req, res, next) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const emailExists = await getUserByEmail(email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    // Find the most recent OTP for the email
    const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    //check date of otp and compare with expiry

    if (response.length === 0 || otp !== response[0].otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }
    //write username from email
    const username = email.split("@")[0];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const avatar = `https://ui-avatars.com/api/?name=${name
      .split(" ")
      .join("+")}`;
    const user = new User({
      avatar,
      username,
      name,
      email,
      password: hashedPassword,
    });
    await createUser(user);
    const loginToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      env.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      token: loginToken,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await getUserByEmail(email);
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return next(
          res.status(400).json({ message: "Invalid email or password" })
        );
      }
      //if remember me is checked, set token expiry to 30 days
      const expiry = rememberMe ? "7d" : "1d";
      const loginToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        env.jwtSecret,
        {
          expiresIn: expiry,
        }
      );
      // dont send password in response
      user.password = undefined;
      return res.status(200).json({
        token: loginToken,
        user: {
          id: user._id,
          ...user._doc,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const suggestUsers = async (req, res, next) => {
  try {
    //return 5 users's name, username, avatar, background, id
    const users = await User.find().select(
      "name username avatar background _id"
    );
    //shuffle users
    users.sort(() => Math.random() - 0.5);
    const suggestedUsers = users.slice(0, 4);
    return res.status(200).json({ suggestedUsers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

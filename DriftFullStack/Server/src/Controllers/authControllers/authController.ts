import type { Request, Response } from "express";
import User from "../../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash } = req.body;
    console.log("User Details for Register : ", req.body);

    const user = await User.findOne({ email }); //This once gets the email that matches the userEmail
    if (user) {
      return res.status(400).json({
        //400 Bad Request
        success: false,
        message: "Invalid Credentials",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(passwordHash, salt);

    const UserData = await User.create({
      name,
      email,
      passwordHash: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: UserData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, passwordHash } = req.body;
    const user = await User.findOne({ email }); //finding whether the email actually exist or not...
    console.log("User Details in login : ", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      passwordHash,
      user.passwordHash,
    ); //checks whether the user entered password and the password in the DB are same
    console.log("Valid Details : ", isPasswordMatch);
    if (!isPasswordMatch) {
      res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY; //SECRET KEY
    const token = jwt.sign(
      //jwt.sign received 3 arguments , first arg receives payload , second received secret key and third receives expiration time
      {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      SECRET_KEY ?? "",
      { expiresIn: "1hr" },
    );
    return res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully",
      accessToken: token,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { register, login };

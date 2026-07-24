import type { Request, Response } from "express";
import User from "../../Models/User.js";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, passwordHash } = req.body;
    console.log("User Details for Register : ", req.body);

    const user = await User.findOne({ email }); //This once gets the email that matches the userEmail
    if (user) {
      res.status(400).json({
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

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: UserData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};

const login = async (req: Request, res: Response) => {};

export { register, login };

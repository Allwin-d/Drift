import type { NextFunction, Request, Response } from "express";
import User from "../../Models/UserModel/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
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
    const hashPassword = await bcrypt.hash(password, salt);

    const UserData = await User.create({
      name,
      email,
      passwordHash: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: {
        _id: UserData._id,
        name: UserData.name,
        email: UserData.email,
        createdAt: UserData.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //finding whether the email actually exist or not...
    console.log("User Details in login : ", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash); //checks whether the user entered password and the password in the DB are same
    console.log("Valid Details : ", isPasswordMatch);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized",
      });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY; //SECRET KEY
    if (!SECRET_KEY) {
      throw new Error("Secret Key not Found");
    }
    const token = jwt.sign(
      //jwt.sign received 3 arguments , first arg receives payload , second received secret key and third receives expiration time
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      SECRET_KEY,
      { expiresIn: "1hr" },
    );

    const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

    if (!REFRESH_SECRET_KEY) {
      throw new Error("Refresh Secret Key not Found");
    }

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      REFRESH_SECRET_KEY,
      { expiresIn: "7d" },
    );

    await User.findByIdAndUpdate(user._id, { refreshToken: refreshToken });

    return res
      .cookie("session_id", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "User LoggedIn Successfully",
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        accessToken: token,
      });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Get refresh token from HTTP-only cookie
    const refreshToken = req.cookies?.session_id;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    // 2. Get refresh secret
    const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY;

    if (!REFRESH_SECRET_KEY) {
      throw new Error("Refresh Secret Key not Found");
    }

    // 3. Verify refresh token
    let decoded: jwt.JwtPayload;

    try {
      decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as jwt.JwtPayload;
    } catch {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // 4. Check refresh token in database
    const user = await User.findOne({
      _id: decoded._id,
      refreshToken: refreshToken,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Refresh token does not exist",
      });
    }

    // 5. Generate new access token
    const SECRET_KEY = process.env.JWT_SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("Access Secret Key not Found");
    }

    const newAccessToken = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      SECRET_KEY,
      { expiresIn: "1hr" },
    );

    // 6. Return new access token
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, refresh };

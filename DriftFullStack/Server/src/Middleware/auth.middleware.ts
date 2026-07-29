import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"]; //gets the headers -> authorization
    const token = authHeader && authHeader.split(" ")[1]; //gets only the token , and neglects the String [bearer]
    console.log("Token", token);

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error("Secret Key not Found");
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Access Denied , Token not provided",
      });
      throw new Error("No Token provided");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Expired or Invalid Token",
    });
  }
};

export default verifyToken;

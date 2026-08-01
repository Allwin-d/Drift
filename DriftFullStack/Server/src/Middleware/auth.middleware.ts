import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"]; //gets the headers -> authorization which is a key
    const token = authHeader && authHeader.split(" ")[1]; //gets only the token , and neglects the String [bearer]
    console.log("Token", token);

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access Denied , Token not provided",
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY); // decodes the token basically the user details stored in the token
    req.user = decoded;
    next();
  } catch (err) {
  return res.status(401).json({
      success: false,
      message: "Expired or Invalid Token",
    });
  }
};

export default verifyToken;

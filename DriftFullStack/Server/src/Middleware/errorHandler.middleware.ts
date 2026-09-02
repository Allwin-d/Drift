import type { NextFunction, Request, Response } from "express";
import type { Error } from "mongoose";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

export default errorHandler;

import { Types } from "mongoose";

export type tokenType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  createdAt: number;
};

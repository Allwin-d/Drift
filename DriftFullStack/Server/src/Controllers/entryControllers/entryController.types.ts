import { Types } from "mongoose";
export type userType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  createdAt: string;
};

export type filterObjType = {
  userId: Types.ObjectId;
  mood?: number;
};

export type weatherResponseType = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

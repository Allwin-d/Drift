import type { Request, Response } from "express";
import Entry from "../../Models/EntrySchema/Entry.js";
import { Types } from "mongoose";

export type userType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  createdAt: string;
};

export const createEntry = async (req: Request, res: Response) => {
  try {
    console.log("Request.user info :", req.user);
    const { _id } = req.user as userType;
    const { content, mood, lat, lng } = req.body;

    const userEntry = await Entry.create({
      userId: _id,
      content,
      mood,
      location: {
        coordinates: [lng, lat],
      },
    });

    return res.status(201).json({
      success: true,
      message: "Entry Created Successfully",
      data: {
        userId: userEntry.userId,
        content: userEntry.content,
        mood: userEntry.mood,
        location: {
          coordinates: [userEntry.location?.coordinates],
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went Wrong",
    });
  }
};

export default { createEntry };

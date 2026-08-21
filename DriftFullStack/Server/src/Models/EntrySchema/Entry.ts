import mongoose, { Types } from "mongoose";
import { sessionOfDayEnum } from "./entrySchema.types.js";

export const entrySchema = new mongoose.Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  placeName: {
    type: String,
  },
  weather: {
    tempC: Number,
    condition: String,
    icon: String,
  },
  timeOfDay: {
    type: String || Number,
    enum: Object.values(sessionOfDayEnum),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Entry = mongoose.model("Entry", entrySchema);
export default Entry;

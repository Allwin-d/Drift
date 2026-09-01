import { z } from "zod";
import { sessionOfDayEnum } from "../Models/EntrySchema/entrySchema.types.js";

export const createEntryValidation = z.object({
  content: z.string().min(1, "Content is required"),

  mood: z.number().int().min(1).max(5),

  location: z.object({
    type: z.literal("Point"),

    coordinates: z
      .array(z.number())
      .length(2, "Coordinates must contain longitude and latitude"),
  }),

  placeName: z.string().optional(),

  weather: z
    .object({
      tempC: z.number().optional(),
      condition: z.string().optional(),
      icon: z.string().optional(),
    })
    .optional(),

  timeOfDay: z.enum(Object.values(sessionOfDayEnum) as [string, ...string[]]),
});

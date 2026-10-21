import { z } from "zod";

export const createEntryValidation = z.object({
  content: z.string().trim().min(1, "Content is required"),

  mood: z.coerce.number().int().min(1).max(5),

  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

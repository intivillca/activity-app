import { z } from "zod";

export const schema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  location: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  img: z.any().optional(),
});

import z from "zod";

export const postActivitySchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  location: z.string().optional().nullable(),
  tags: z.string().array().optional(),
  fileId: z.number().optional(),
});

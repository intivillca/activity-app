import z from "zod";

export const groupType = z.enum(["PUBLIC", "PRIVATE", "LOCKED"]);
export const postGroupSchema = z.object({
  type: groupType,
  name: z.string(),
  description: z.string().optional(),
  maxSize: z.number(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  location: z.string().optional().nullable(),
  tags: z.string().array().optional(),
  avatarId: z.number().optional(),
  activityId: z.number(),
});

export type PostGroup = z.infer<typeof postGroupSchema>;

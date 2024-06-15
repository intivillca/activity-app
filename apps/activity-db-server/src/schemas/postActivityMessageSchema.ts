import z from "zod";
import { postFileSchema } from "./postFileSchema";

export const postActivityMessageSchema = z.object({
  activityId: z.number(),
  senderId: z.number(),
  content: z.string(),
  attachments: z.array(postFileSchema),
});

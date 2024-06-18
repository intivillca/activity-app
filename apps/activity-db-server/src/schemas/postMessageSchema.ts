import { z } from "zod";
import { postFileSchema } from "./postFileSchema";

export const postMessageSchema = z.object({
  activityId: z.number(),
  senderId: z.number(),
  content: z.string(),
  attachments: z.array(postFileSchema),
});

export type PostMessage = z.infer<typeof postMessageSchema>;

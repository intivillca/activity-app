import z from "zod";

export const createInviteSchema = z.object({
  activityID: z.number(),
  groupId: z.number().optional(),
});

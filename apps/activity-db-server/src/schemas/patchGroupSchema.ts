import z from "zod";
import { postGroupSchema } from "./postGroupSchema";

export const patchGroupSchema = postGroupSchema.partial();

export type PatchGroup = z.infer<typeof patchGroupSchema>;

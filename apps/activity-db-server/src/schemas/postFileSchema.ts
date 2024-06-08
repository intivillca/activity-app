import z from "zod";

export const postFileSchema = z.object({
  type: z.enum(["image", "file"]),
  fileName: z.string(),
  mimeType: z.string(),
  checksum: z.string(),
  fileSize: z.number(),
  original: z.string(),
});

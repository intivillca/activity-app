import { z } from "zod";
import _ from "lodash";

const LAT_LONG_REGEX = /^-?\d+(?:\.\d+)?\/-?\d+(?:\.\d+)?$/;

export const patchActivitySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  startDate: z.string().datetime().optional().nullable(),
  endDate: z.string().datetime().optional().nullable(),
  location: z.string().optional().nullable(),
  tags: z.string().array().optional(),
});

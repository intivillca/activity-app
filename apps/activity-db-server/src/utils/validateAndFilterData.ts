import z, { ZodObject, ZodType } from "zod";
import _ from "lodash";

export const validateAndFilterData = <T extends ZodType<any> = ZodObject<any>>(
  data: Object,
  schema: z.ZodObject<any>
) => {
  const validationResult = schema.safeParse(data);
  if (!validationResult.success) {
    console.log(validationResult.error);
    return null;
  }

  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => schema.shape.hasOwnProperty(key))
  );
  return filteredData as z.infer<T>;
};

import { z } from "zod";

const RegisterUserSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default RegisterUserSchema;

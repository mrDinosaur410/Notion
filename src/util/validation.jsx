import { z } from "zod";
const User = z.object({
  alias: z.string(),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .regex(
      new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/),
      "The password must contain 1 uppercase letter, 1 lowercase letter, and 1 number and at least 8 characters"
    ),
});

export default User;

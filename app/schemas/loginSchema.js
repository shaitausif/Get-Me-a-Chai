const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email({message : "Email is Invalid"}),
  password: z.string().min(6,"Password must be atleast 6 characters"),
});

export default loginSchema
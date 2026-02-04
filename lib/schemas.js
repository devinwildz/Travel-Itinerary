import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(72, { message: "Password is too long" }),
});

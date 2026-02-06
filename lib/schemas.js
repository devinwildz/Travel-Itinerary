import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(72, { message: "Password is too long" }),
});

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  phone: z
    .string()
    .min(10, "Phone number is required"),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
});

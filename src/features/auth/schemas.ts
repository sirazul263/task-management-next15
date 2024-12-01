import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, "Password must be at least 1 characters")
    .max(256, "Password must be at best 256 characters"),
});

export const signupSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(256, "Password must be at best 256 characters"),
});

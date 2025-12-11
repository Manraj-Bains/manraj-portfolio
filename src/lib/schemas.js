import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z
    .string()
    .email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters."),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required.").max(200, "Title is too long."),
  description: z.string().optional().nullable(),
  image: z
    .union([z.string().url("Image must be a valid URL."), z.literal("")])
    .optional()
    .default(""),
  link: z
    .union([z.string().url("Link must be a valid URL."), z.literal("")])
    .optional()
    .default(""),
  keywords: z.array(z.string()).optional().default([]),
});
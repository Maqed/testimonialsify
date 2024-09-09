import { z } from "zod";

export const userSettingsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .regex(/^[^\s/]+$/, {
      message: "Username cannot contain spaces or slashes.",
    }),
});

import { z } from "zod";

export const createProjectsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name of the project must be at least 1 characters." })
    .regex(/^[^\/\s<>#%{}|\\^~[\]`]+$/, {
      message: "Name contains invalid characters.",
    }), //  Regex for other URL-safe characters
});

import { z } from "zod";

export const createProjectsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name of the project must be at least 1 characters." }),
});

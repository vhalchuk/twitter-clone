import { z } from "zod";

export const tweetSchema = z.object({
  text: z
    .string()
    .min(10, "Tweet must contain at least 10 character(s)")
    .max(280, "Tweet must contain at most 280 character(s)"),
});

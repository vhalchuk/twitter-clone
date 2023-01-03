import { protectedProcedure, publicProcedure, router } from "../trpc";
import { tweetSchema } from "../../../schemas/tweet";
import { z } from "zod";

export const tweetRouter = router({
  createTweet: protectedProcedure
    .input(tweetSchema)
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }),
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit } = input;

      const tweets = await prisma.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;

      if (tweets.length > limit) {
        const nextItem = tweets.pop() as typeof tweets[number];

        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),
});

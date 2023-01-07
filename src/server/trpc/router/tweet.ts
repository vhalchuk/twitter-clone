import { protectedProcedure, publicProcedure, router } from "../trpc";
import { tweetSchema } from "../../../schemas/tweet";
import { z } from "zod";

export const tweetRouter = router({
  createTweet: protectedProcedure
    .input(tweetSchema)
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text } = input;

      const authorId = ctx.session?.user?.id;

      return prisma.tweet.create({
        data: {
          text,
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
        include: {
          author: {
            select: {
              name: true,
              image: true,
              id: true,
            },
          },
          likes: {
            where: {
              authorId,
            },
            select: {
              authorId: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });
    }),
  timeline: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        take: z.number().min(1).max(50).default(30),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, take } = input;

      const authorId = ctx.session?.user?.id;

      const tweets = await prisma.tweet.findMany({
        take: take + 1,
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
          likes: {
            where: {
              authorId,
            },
            select: {
              authorId: true,
            },
          },
          _count: {
            select: {
              likes: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;

      if (tweets.length > take) {
        const nextItem = tweets.pop() as typeof tweets[number];

        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor,
      };
    }),
  like: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;

      const tweet = await prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });

      if (!tweet) {
        throw new Error("Tweet not found");
      }

      return prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: tweetId,
            },
          },
          author: {
            connect: {
              id: session.user.id,
            },
          },
        },
      });
    }),
  unlike: protectedProcedure
    .input(
      z.object({
        tweetId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;

      const tweet = await prisma.tweet.findUnique({
        where: {
          id: tweetId,
        },
      });

      if (!tweet) {
        throw new Error("Tweet not found");
      }

      return prisma.like.delete({
        where: {
          tweetId_authorId: {
            tweetId,
            authorId: session.user.id,
          },
        },
      });
    }),
});

import { protectedProcedure, router } from "../trpc";
import { tweetSchema } from "../../../schemas/tweet";

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
});

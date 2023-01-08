import { type InfiniteData } from "@tanstack/query-core";
import { useQueryClient } from "@tanstack/react-query";

import { type RouterOutputs } from "../../utils/trpc";
import { useTimelineContext } from "../timeline/TimelineProvider";

export const useUpdateLikesQueryCache = () => {
  const queryClient = useQueryClient();
  const { input } = useTimelineContext();

  return function updateLikesQueryCache(
    tweetId: string,
    action: "like" | "unlike"
  ) {
    queryClient.setQueryData(
      [["tweet", "timeline"], { input, type: "infinite" }],
      (oldData) => {
        const newData = oldData as InfiniteData<
          RouterOutputs["tweet"]["timeline"]
        >;

        const value = action === "like" ? 1 : -1;

        const newTweets = newData.pages.map((page) => {
          return {
            tweets: page.tweets.map((tweet) => {
              if (tweet.id === tweetId) {
                return {
                  ...tweet,
                  isLiked: action === "like",
                  _count: {
                    likes: tweet._count.likes + value,
                  },
                };
              }

              return tweet;
            }),
          };
        });

        return {
          ...newData,
          pages: newTweets,
        };
      }
    );
  };
};

import { type InfiniteData } from "@tanstack/query-core";
import { useQueryClient } from "@tanstack/react-query";

import { type RouterOutputs } from "../../utils/trpc";
import { TAKE } from "../timeline/const";

type Tweet = RouterOutputs["tweet"]["createTweet"];
type Page = {
  nextCursor: string | null;
  tweets: Tweet[];
};

export const useAddTweetToQueryCache = () => {
  const queryClient = useQueryClient();
  const input = {
    take: TAKE,
  };

  return function addTweetToQueryCache(
    newTweet: RouterOutputs["tweet"]["createTweet"]
  ) {
    queryClient.setQueryData<InfiniteData<RouterOutputs["tweet"]["timeline"]>>(
      [["tweet", "timeline"], { input, type: "infinite" }],
      (oldData) => {
        if (!oldData) {
          return oldData;
        }

        const allTweets = [
          newTweet,
          ...oldData.pages.flatMap((page) => page.tweets),
        ];

        const pages = allTweets.reduce((acc, tweet, index) => {
          const lastPage = acc.at(-1);

          if (index % TAKE === 0) {
            if (lastPage) {
              lastPage.nextCursor = tweet.id;
            }

            acc.push({
              nextCursor: oldData.pages.at(-1)?.nextCursor || null,
              tweets: [tweet],
            });
          } else {
            lastPage && lastPage.tweets.push(tweet);
          }
          return acc;
        }, [] as Page[]);

        return {
          ...oldData,
          pages,
        };
      }
    );
  };
};

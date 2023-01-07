import { useQueryClient } from "@tanstack/react-query";
import { type RouterOutputs } from "../../utils/trpc";
import { type InfiniteData } from "@tanstack/query-core";

export const useUpdateLikesQueryCache = () => {
  const queryClient = useQueryClient();

  return function updateLikesQueryCache({
    variables,
    data,
    action,
  }: {
    variables: {
      tweetId: string;
    };
    data: RouterOutputs["tweet"]["like"];
    action: "like" | "unlike";
  }) {
    queryClient.setQueryData(
      [["tweet", "timeline"], { input: {}, type: "infinite" }],
      (oldData) => {
        console.log("oldData", oldData);
        const newData = oldData as InfiniteData<
          RouterOutputs["tweet"]["timeline"]
        >;

        const value = action === "like" ? 1 : -1;

        const newTweets = newData.pages.map((page) => {
          return {
            tweets: page.tweets.map((tweet) => {
              if (tweet.id === variables.tweetId) {
                return {
                  ...tweet,
                  likes: action === "like" ? [data.authorId] : [],
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

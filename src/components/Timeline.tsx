import React from "react";
import { CreateTweet } from "./CreateTweet";
import { trpc } from "../utils/trpc";
import { Tweet } from "./Tweet";
import { Button } from "./Button";

export const Timeline: React.FC = () => {
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <CreateTweet />
      <div className="flex flex-col border-t border-gray-100">
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))}
        <div className="flex place-content-center pt-2">
          <Button
            onClick={handleLoadMore}
            disabled={!hasNextPage || isFetching}
          >
            more
          </Button>
        </div>
      </div>
    </div>
  );
};

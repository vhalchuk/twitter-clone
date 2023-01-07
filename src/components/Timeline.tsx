import React from "react";
import { CreateTweet } from "./CreateTweet";
import { trpc } from "../utils/trpc";
import { Tweet } from "./Tweet";
import { Button } from "./Button";
import { useSession } from "next-auth/react";

export const Timeline: React.FC = () => {
  const { data: session } = useSession();
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {},
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
      {session && <CreateTweet />}
      <div className="flex flex-col border-t border-gray-100">
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))}
        <div className="flex place-content-center pt-2">
          {hasNextPage && (
            <Button
              onClick={handleLoadMore}
              disabled={!hasNextPage || isFetching}
            >
              {isFetching ? "Loading..." : "Load more"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { CreateTweet } from "../CreateTweet";
import { trpc } from "../../utils/trpc";
import { Tweet } from "../Tweet";
import { useScrollPosition } from "./useScrollPosition";

export const Timeline: React.FC = () => {
  const scrollPosition = useScrollPosition();
  const { data: session } = useSession();
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useEffect(() => {
    if (hasNextPage && !isFetching && scrollPosition > 90) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, scrollPosition, fetchNextPage]);

  return (
    <div className="flex flex-col gap-4 py-4">
      {session && <CreateTweet />}
      <div className="flex flex-col border-t border-gray-100">
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))}
        {!hasNextPage && (
          <p className="py-4 text-center text-gray-500">
            You have reached the end of the timeline
          </p>
        )}
      </div>
    </div>
  );
};

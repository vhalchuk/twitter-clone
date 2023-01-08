import React, { useEffect } from "react";
import { type RouterInputs, trpc } from "../../utils/trpc";
import { Tweet } from "../tweet/Tweet";
import { useScrollPosition } from "./useScrollPosition";
import { INPUT } from "./const";

type TimelineProps = {
  where?: RouterInputs["tweet"]["timeline"]["where"];
};

export const Timeline: React.FC<TimelineProps> = ({ where = {} }) => {
  const scrollPosition = useScrollPosition();
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(
      { ...INPUT, where },
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
    <div className="flex flex-col gap-4">
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

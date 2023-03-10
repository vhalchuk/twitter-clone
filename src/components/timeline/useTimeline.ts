import { useMemo } from "react";

import { trpc } from "../../utils/trpc";
import { type TimelineProps } from "./Timeline";
import { type TimelineContextValue } from "./TimelineProvider";
import { TAKE } from "./const";
import { useInfiniteScroll } from "./useInfiniteScroll";

// Keeps the same reference between renders
const DEFAULT_WHERE = {};

// Separates component's logic from presentation logic
export const useTimeline = ({ where = DEFAULT_WHERE }: TimelineProps) => {
  const input = useMemo(() => ({ take: TAKE, where }), [where]);
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(input, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useInfiniteScroll({
    hasNextPage,
    isFetching,
    fetchNextPage,
  });

  const providerValue = useMemo<TimelineContextValue>(
    () => ({
      input,
    }),
    [input]
  );

  const endReached = !hasNextPage && !isFetching;

  return { tweets, endReached, providerValue, isFetching };
};

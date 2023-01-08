import { trpc } from "../../utils/trpc";
import { TAKE } from "./const";
import { useMemo } from "react";
import { type TimelineProps } from "./Timeline";
import { type TimelineContextValue } from "./TimelineProvider";
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

  return { tweets, hasNextPage, providerValue, isFetching };
};

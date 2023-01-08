import { useScrollPosition } from "./useScrollPosition";
import { trpc } from "../../utils/trpc";
import { TAKE } from "./const";
import { useEffect, useMemo } from "react";
import { type TimelineProps } from "./Timeline";
import { type TimelineContextValue } from "./TimelineProvider";

// Keeps the same reference between renders
const DEFAULT_WHERE_PROP = {};

// Separates component's logic from presentation logic
export const useTimeline = ({ where = DEFAULT_WHERE_PROP }: TimelineProps) => {
  const scrollPosition = useScrollPosition();
  const input = useMemo(() => ({ take: TAKE, where }), [where]);
  const { data, hasNextPage, fetchNextPage, isFetching } =
    trpc.tweet.timeline.useInfiniteQuery(input, {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

  useEffect(() => {
    if (hasNextPage && !isFetching && scrollPosition > 90) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, scrollPosition, fetchNextPage]);

  const providerValue = useMemo<TimelineContextValue>(
    () => ({
      input,
    }),
    [input]
  );

  return { tweets, hasNextPage, providerValue };
};

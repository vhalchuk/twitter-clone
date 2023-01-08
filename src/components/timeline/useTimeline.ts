import { useScrollPosition } from "./useScrollPosition";
import { trpc } from "../../utils/trpc";
import { INPUT } from "./const";
import { useEffect } from "react";
import { type TimelineProps } from "./Timeline";

// Separates component's logic from presentation logic
export const useTimeline = ({ where = {} }: TimelineProps) => {
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

  return { tweets, hasNextPage };
};

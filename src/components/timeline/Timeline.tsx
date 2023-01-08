import React from "react";

import { type RouterInputs } from "../../utils/trpc";
import { Tweet } from "../tweet/Tweet";
import { TimelineProvider } from "./TimelineProvider";
import { useTimeline } from "./useTimeline";

export type TimelineProps = {
  where?: RouterInputs["tweet"]["timeline"]["where"];
};

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { tweets, hasNextPage, providerValue, isFetching } = useTimeline(props);

  return (
    <TimelineProvider value={providerValue}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col border-t border-gray-100">
          {tweets.map((tweet) => (
            <Tweet tweet={tweet} key={tweet.id} />
          ))}
          {isFetching && (
            <p className="py-4 text-center text-gray-500">
              Loading more tweets...
            </p>
          )}
          {!hasNextPage && (
            <p className="py-4 text-center text-gray-500">
              You have reached the end of the timeline
            </p>
          )}
        </div>
      </div>
    </TimelineProvider>
  );
};

import React, { type FC } from "react";
import type { TimelineProps } from "./Timeline";

export type TimelineContextValue = {
  input: {
    take: number;
    where: TimelineProps["where"];
  };
};

type TimelineProviderProps = {
  value: TimelineContextValue;
  children: React.ReactNode;
};

const TimelineContext = React.createContext<TimelineContextValue | null>(null);

export const TimelineProvider: FC<TimelineProviderProps> = ({
  value,
  children,
}) => {
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimelineContext = () => {
  const context = React.useContext(TimelineContext);

  if (context === null) {
    throw new Error(
      "useTimelineContext must be used within a TimelineProvider"
    );
  }

  return context;
};

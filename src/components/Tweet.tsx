import React from "react";
import type { RouterOutputs } from "../utils/trpc";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

type TweetProps = {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
};

export const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const { author } = tweet;
  const { image } = author;

  return (
    <div className="flex gap-2 border-b border-gray-100 px-2 py-4">
      <div>
        {image && (
          <Image
            src={image}
            alt={`${author.name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <div>
          <span className="font-bold">{author.name}</span>
          <span className="ml-1 font-light text-gray-500">
            - {dayjs(tweet.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-sm">{tweet.text}</div>
      </div>
    </div>
  );
};

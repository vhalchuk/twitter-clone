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
import { trpc } from "../utils/trpc";
import { LikeButton } from "./LikeButton";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import { type InfiniteData } from "@tanstack/query-core";

type TweetProps = {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
};

export const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  const { author } = tweet;
  const { image } = author;

  const { data: session } = useSession();
  const updateLikesQueryCache = useUpdateLikesQueryCache();
  const likeMutation = trpc.tweet.like.useMutation({
    onSuccess: (data, variables) => {
      updateLikesQueryCache({ data, variables, action: "like" });
    },
  }).mutateAsync;
  const unlikeMutation = trpc.tweet.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateLikesQueryCache({ data, variables, action: "unlike" });
    },
  }).mutateAsync;

  const isLiked = tweet.likes.length > 0;

  const toggleLike = async () => {
    if (isLiked) {
      await unlikeMutation({ tweetId: tweet.id });
    } else {
      await likeMutation({ tweetId: tweet.id });
    }
  };

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
      <div className="flex flex-grow flex-col gap-2 text-sm">
        <div>
          <span className="font-bold">{author.name}</span>
          <span className="ml-1 font-light text-gray-500">
            - {dayjs(tweet.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-sm">{tweet.text}</div>
        <LikeButton
          liked={isLiked}
          likes={tweet._count.likes}
          className="self-end"
          onClick={toggleLike}
          disabled={!session}
        />
      </div>
    </div>
  );
};

function useUpdateLikesQueryCache() {
  const queryClient = useQueryClient();

  return function updateLikesQueryCache({
    variables,
    data,
    action,
  }: {
    variables: {
      tweetId: string;
    };
    data: RouterOutputs["tweet"]["like"];
    action: "like" | "unlike";
  }) {
    queryClient.setQueryData(
      [["tweet", "timeline"], { input: {}, type: "infinite" }],
      (oldData) => {
        console.log("oldData", oldData);
        const newData = oldData as InfiniteData<
          RouterOutputs["tweet"]["timeline"]
        >;

        const value = action === "like" ? 1 : -1;

        const newTweets = newData.pages.map((page) => {
          return {
            tweets: page.tweets.map((tweet) => {
              if (tweet.id === variables.tweetId) {
                return {
                  ...tweet,
                  likes: action === "like" ? [data.authorId] : [],
                  _count: {
                    likes: tweet._count.likes + value,
                  },
                };
              }

              return tweet;
            }),
          };
        });

        return {
          ...newData,
          pages: newTweets,
        };
      }
    );
  };
}

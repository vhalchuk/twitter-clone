import React from "react";
import type { RouterOutputs } from "../../utils/trpc";
import Image from "next/image";
import { LikeButton } from "../LikeButton";
import { dayjs } from "../../utils/dayjs";
import { useTweet } from "./useTweet";

export type TweetProps = {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
};

export const Tweet: React.FC<TweetProps> = (props) => {
  const { imageSrc, author, tweet, isLiked, isLikeButtonDisabled, toggleLike } =
    useTweet(props);

  return (
    <div className="flex gap-2 border-b border-gray-100 px-2 py-4">
      <div>
        {imageSrc && (
          <Image
            src={imageSrc}
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
          disabled={isLikeButtonDisabled}
        />
      </div>
    </div>
  );
};

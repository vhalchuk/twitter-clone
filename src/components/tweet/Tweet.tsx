import React from "react";
import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "../../utils/trpc";
import { LikeButton } from "../like-button/LikeButton";
import { dayjs } from "../../utils/dayjs";
import { useTweet } from "./useTweet";

export type TweetProps = {
  tweet: RouterOutputs["tweet"]["timeline"]["tweets"][number];
};

export const Tweet: React.FC<TweetProps> = (props) => {
  const {
    imageSrc,
    name,
    createdAt,
    text,
    likesCount,
    isLiked,
    isLikeButtonDisabled,
    toggleLike,
  } = useTweet(props);

  return (
    <div className="flex gap-2 border-b border-gray-100 px-2 py-4">
      <div>
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={`${name} profile picture`}
            width={48}
            height={48}
            className="rounded-full"
          />
        )}
      </div>
      <div className="flex flex-grow flex-col gap-2 text-sm">
        <div>
          <Link href={`/${name}`} className="font-bold">
            {name}
          </Link>
          <span className="ml-1 font-light text-gray-500">
            - {dayjs(createdAt).fromNow()}
          </span>
        </div>
        <div className="text-sm">{text}</div>
        <LikeButton
          liked={isLiked}
          likes={likesCount}
          className="self-end"
          onClick={toggleLike}
          disabled={isLikeButtonDisabled}
        />
      </div>
    </div>
  );
};

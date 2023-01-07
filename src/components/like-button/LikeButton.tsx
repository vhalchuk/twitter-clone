import React from "react";
import classNames from "classnames";
import { LikeFilledIcon } from "./LikeFilledIcon";
import { LikeOutlinedIcon } from "./LikeOutlinedIcon";

type LikeButtonProps = {
  liked: boolean;
  likes: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export const LikeButton: React.FC<LikeButtonProps> = ({
  liked,
  likes,
  onClick,
  className,
  disabled,
}) => {
  const buttonClassNames = classNames(
    "flex items-center gap-1 text-gray-400 fill-gray-400 w-fit",
    "transition ease-in-out hover:text-rose-500 hover:fill-rose-500",
    "disabled:cursor-default",
    {
      "text-rose-500 fill-rose-500": liked,
      "disabled:hover:text-gray-400 disabled:hover:fill-gray-400": !liked,
    },
    className
  );

  return (
    <button onClick={onClick} className={buttonClassNames} disabled={disabled}>
      <span className="text-xs">{likes}</span>
      {liked ? <LikeFilledIcon /> : <LikeOutlinedIcon />}
    </button>
  );
};

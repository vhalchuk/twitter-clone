import classNames from "classnames";
import React from "react";

import { LikeFilledIcon } from "./LikeFilledIcon";
import { LikeOutlinedIcon } from "./LikeOutlinedIcon";
import { commonClasses, likedClasses, unlikedClasses } from "./styles";

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
    commonClasses,
    {
      [likedClasses]: liked,
      [unlikedClasses]: !liked,
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

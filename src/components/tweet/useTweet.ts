import { useSession } from "next-auth/react";
import { useUpdateLikesQueryCache } from "./useUpdateLikesQueryCache";
import { trpc } from "../../utils/trpc";
import { type TweetProps } from "./Tweet";

// Separates component's logic from presentation logic
export const useTweet = ({ tweet }: TweetProps) => {
  const { author } = tweet;

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

  return {
    imageSrc: author.image,
    author,
    tweet,
    isLiked,
    isLikeButtonDisabled: !session,
    toggleLike,
  };
};

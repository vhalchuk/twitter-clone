import { useSession } from "next-auth/react";
import { useUpdateLikesQueryCache } from "./useUpdateLikesQueryCache";
import { trpc } from "../../utils/trpc";
import { type TweetProps } from "./Tweet";

// Separates component's logic from presentation logic
export const useTweet = ({ tweet }: TweetProps) => {
  const { author, isLiked } = tweet;

  const { data: session } = useSession();
  const updateLikesQueryCache = useUpdateLikesQueryCache();
  const likeMutation = trpc.tweet.like.useMutation({
    onSuccess: (data, { tweetId }) => {
      updateLikesQueryCache(tweetId, "like");
    },
  }).mutateAsync;
  const unlikeMutation = trpc.tweet.unlike.useMutation({
    onSuccess: (data, { tweetId }) => {
      updateLikesQueryCache(tweetId, "unlike");
    },
  }).mutateAsync;

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

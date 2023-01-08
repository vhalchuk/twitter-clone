import { useState, type FormEvent } from "react";

import { tweetSchema } from "../../schemas/tweet";
import { trpc } from "../../utils/trpc";
import { useAddTweetToQueryCache } from "./useAddTweetToQueryCache";

// Separates component's logic from presentation logic
export const useCreateTweet = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const utils = trpc.useContext();
  const addTweetToQueryCache = useAddTweetToQueryCache();

  const { mutateAsync } = trpc.tweet.createTweet.useMutation({
    onSuccess: (newTweet) => {
      setText("");
      addTweetToQueryCache(newTweet);
      utils.tweet.timeline.invalidate();
    },
    onError: () => {
      setError("Failed to create tweet");
    },
  });

  const handleCreateTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = tweetSchema.safeParse({ text });

    if (result.success) {
      mutateAsync({ text });
      setError(null);
    } else {
      const message = result.error.issues[0]?.message || "Invalid input";
      setError(message);
    }
  };

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };

  return {
    handleCreateTweet,
    text,
    handleChange,
    error,
  };
};

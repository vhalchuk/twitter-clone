import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { tweetSchema } from "../../schemas/tweet";
import { Button } from "../button/Button";
import { useAddTweetToQueryCache } from "./useAddTweetToQueryCache";

export const CreateTweet: React.FC = () => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-md px-4"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`
          h-20
          w-full
          resize-none
          border-b
          border-gray-100
          p-4
          outline-blue-300
        `}
        placeholder="What's happening?"
      />
      {error && <div className="text-red-400">{error}</div>}
      <Button type="submit">Tweet</Button>
    </form>
  );
};

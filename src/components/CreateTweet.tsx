import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { tweetSchema } from "../schemas/tweet";
import { Button } from "./Button";

export const CreateTweet: React.FC = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync } = trpc.tweet.createTweet.useMutation({
    onError: () => {
      setError("Failed to create tweet");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = tweetSchema.safeParse({ text });

    if (result.success) {
      mutateAsync({ text });
      setText("");
      setError(null);
    } else {
      const message = result.error.issues[0]?.message || "Invalid input";
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 rounded-md p-4"
    >
      <textarea
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

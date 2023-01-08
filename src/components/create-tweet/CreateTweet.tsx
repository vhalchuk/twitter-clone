import React from "react";

import { Button } from "../button/Button";
import { useCreateTweet } from "./useCreateTweet";

export const CreateTweet: React.FC = () => {
  const { handleCreateTweet, text, handleChange, error } = useCreateTweet();

  return (
    <form
      onSubmit={handleCreateTweet}
      className="flex w-full flex-col gap-4 rounded-md p-4"
    >
      <textarea
        value={text}
        onChange={handleChange}
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

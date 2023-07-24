"use client";

import { FormEvent, useState } from "react";
import SmileIcon from "../icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-30"
    >
      <SmileIcon />
      <input
        className="w-full p-3 ml-2 border-none outline-none "
        type="text"
        placeholder="Add a comment..."
        required
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button
        className={`ml-2 font-bold  ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
        disabled={buttonDisabled}
      >
        Post
      </button>
    </form>
  );
}

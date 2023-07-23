"use client";

import HeartIcon from "../icons/HeartIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import { useState } from "react";
import ToggleButton from "../buttons/ToggleButton";
import HeartFillIcon from "../icons/HeartFillIcon";
import BookmarkFillIcon from "../icons/BookmarkFillIcon";
import { SimplePost } from "@/model/post";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user.username) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (like: boolean) => {
    if (user) {
      setLike(post, user.username, like);
    }
  };

  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">
          {`${likes?.length ?? 0}`} {likes?.length > 1 ? "likes" : "like"}
        </p>
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}

        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}

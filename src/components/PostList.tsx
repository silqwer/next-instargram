"use client";

import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostListCard from "./ui/posts/PostListCard";

export default function PostList() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
  return (
    <section>
      {isLoading && <GridLoader color="red" />}
      {posts && (
        <ul>
          {posts &&
            posts.map((post) => <PostListCard key={post.id} post={post} />)}
        </ul>
      )}
    </section>
  );
}

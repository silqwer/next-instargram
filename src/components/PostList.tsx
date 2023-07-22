"use client";

import PostListCard from "./ui/posts/PostListCard";
import GridSpinner from "./ui/spinner/GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostList() {
  const { posts, isLoading } = usePosts();
  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id} className="mb-4">
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}

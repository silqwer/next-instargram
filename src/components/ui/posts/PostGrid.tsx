import { GridLoader } from "react-spinners";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center ">
      {isLoading && <GridLoader />}
      <ul className="grid gap-4 px-8 py-4 md:grid-cols-3 sm:grid-cols-1">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}

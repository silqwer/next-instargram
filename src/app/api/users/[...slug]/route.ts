import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/posts";
import { searchUsers } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

/**
 * /users/${username}/${tab}
 * 과 같이 username, tab 여러개를 받을 때
 * params로 하나가 아닌 여러개의 키를 받을 때 ...slug로 작성한다.
 */

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bed Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}

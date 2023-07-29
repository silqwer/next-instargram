import { NextRequest, NextResponse } from "next/server";
import { dislikePost, likePost } from "@/service/posts";
import { withSessionUser } from "@/util/sesstion";

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, like } = await request.json();

    if (!id || like === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const result = like ? likePost : dislikePost;

    return result(id, user.id)
      .then((response) => NextResponse.json(response))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

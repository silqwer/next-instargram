import { createPost, getFollowingPostsOf } from "@/service/posts";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { withSessionUser } from "@/util/sesstion";

export async function GET() {
  return withSessionUser(async (user) =>
    getFollowingPostsOf(user.username) //
      .then((data) => NextResponse.json(data))
  );
}

export async function POST(request: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await request.formData();
    const text = form.get("text")?.toString();
    const file = form.get("file") as Blob;

    if (!text || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    return createPost(user.id, text, file).then((data) =>
      NextResponse.json(data)
    );
  });
}

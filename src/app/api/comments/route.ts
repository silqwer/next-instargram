import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/service/posts";
import { withSessionUser } from "@/util/sesstion";

export async function POST(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, comment } = await request.json();

    if (!id || comment === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    return addComment(id, user.id, comment)
      .then((response) => NextResponse.json(response))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

import { NextRequest, NextResponse } from "next/server";
import { addBookmark, removeBookmark } from "@/service/user";
import { withSessionUser } from "@/util/sesstion";

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, bookmark } = await request.json();

    if (!id || bookmark === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const result = bookmark ? addBookmark : removeBookmark;

    return result(user.id, id)
      .then((response) => NextResponse.json(response))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

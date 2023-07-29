import { NextRequest, NextResponse } from "next/server";
import { follow, unfollow } from "@/service/user";
import { withSessionUser } from "@/util/sesstion";

export async function PUT(request: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, follow: isFollow } = await request.json();

    if (!targetId || isFollow === undefined) {
      return new Response("Bad Request", { status: 400 });
    }

    const result = isFollow ? follow : unfollow;

    return result(user.id, targetId)
      .then((response) => NextResponse.json(response))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}

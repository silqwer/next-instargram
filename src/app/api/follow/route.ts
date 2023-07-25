import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { follow, unfollow } from "@/service/user";

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await request.json();
  if (!targetId || isFollow === undefined) {
    return new Response("Bad Request", { status: 400 });
  }
  console.log("isFollow:", isFollow);
  const result = isFollow ? follow : unfollow;
  console.log(user.id, targetId);
  return result(user.id, targetId)
    .then((response) => NextResponse.json(response))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}

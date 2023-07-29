import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import NewPost from "@/components/ui/posts/NewPost";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return <NewPost user={session.user} />;
}

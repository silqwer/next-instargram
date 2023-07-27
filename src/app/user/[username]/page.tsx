import UserPosts from "@/components/ui/user/UserPosts";
import UserProfile from "@/components/ui/user/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function page({ params }: Props) {
  const { username } = params;
  const user = await getUser(username);
  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { username } = params;
  const user = await getUser(username);
  return {
    title: `${user.name} (@${user.username}) ﹒Instagram Photos`,
    description: `${user.name}'s all Instagram Posts`,
  };
}

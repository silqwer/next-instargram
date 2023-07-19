import UserProfile from "@/components/ui/user/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function page({ params }: Props) {
  const { username } = params;
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
}

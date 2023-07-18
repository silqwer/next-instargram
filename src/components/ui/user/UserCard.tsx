import Avatar from "@/components/Avatar";
import { ProfileUser } from "@/model/user";
import Link from "next/link";

type Props = {
  user: ProfileUser;
};

export default function UserCard({ user }: Props) {
  const { name, username, image, following, followers } = user;

  return (
    <Link
      className="flex items-center w-full p-4 mb-2 bg-white border rounded-sm border-neutral-300 hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="leading-4 text-black text-bold">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
}

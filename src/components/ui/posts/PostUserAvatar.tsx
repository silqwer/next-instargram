import Avatar from "@/components/Avatar";

type Props = {
  image: string;
  name: string;
};
export default function PostUserAvatar({ image, name }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} size="medium" highlight />
      <span className="ml-2 font-bold text-gray-900">{name}</span>
    </div>
  );
}

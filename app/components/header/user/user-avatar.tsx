import { cn } from "@/app/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

interface UserAvatarProps {
  name: string;
  image: string;
}

const UserAvatar = ({ name, image }: UserAvatarProps) => {
  return (
    <Avatar className={cn("cursor-pointer")}>
      <AvatarImage src={image} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;

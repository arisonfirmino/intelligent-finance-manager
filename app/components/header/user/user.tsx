import { cn } from "@/app/lib/utils";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/app/components/ui/dropdown-menu";
import UserAvatar from "@/app/components/header/user/user-avatar";
import UserInfo from "@/app/components/header/user/user-info";
import UserActions from "@/app/components/header/user/user-actions";

import { User as UserTypes } from "@prisma/client";

interface UserpProps {
  user: Pick<UserTypes, "name" | "email" | "image">;
}

const User = ({ user }: UserpProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("outline-none")}>
        <UserAvatar name={user.name ?? ""} image={user.image ?? ""} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>
          <UserInfo
            name={user.name ?? ""}
            email={user.email ?? ""}
            image={user.image ?? ""}
          />
        </DropdownMenuLabel>
        <UserActions />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default User;

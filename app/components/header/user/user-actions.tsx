import { Button } from "@/app/components/ui/button";
import { DropdownMenuSeparator } from "@/app/components/ui/dropdown-menu";
import SignOutButton from "@/app/components/header/user/signout-button";

import { EraserIcon } from "lucide-react";

const UserActions = () => {
  return (
    <>
      <Button size="dropdown" variant="dropdown">
        <EraserIcon />
        Excluir transações
      </Button>
      <DropdownMenuSeparator />
      <SignOutButton />
    </>
  );
};

export default UserActions;

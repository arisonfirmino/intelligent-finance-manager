"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/app/components/ui/button";

import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  const handleSignOutClick = async () => await signOut();

  return (
    <Button size="dropdown" variant="dropdown" onClick={handleSignOutClick}>
      <LogOutIcon />
      Sair
    </Button>
  );
};

export default SignOutButton;

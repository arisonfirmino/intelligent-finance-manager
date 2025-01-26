"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import NavButton from "@/app/components/header/menu/nav-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DialogTabs from "@/app/components/header/menu/dialog-tabs";
import { Button } from "@/app/components/ui/button";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  ArrowRightLeftIcon,
  HomeIcon,
  PiggyBankIcon,
  PlusIcon,
  WalletCardsIcon,
} from "lucide-react";

import { Bank } from "@prisma/client";

const Menu = ({ banks }: { banks: Bank[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pages = [
    { page: "Home", icon: <HomeIcon />, href: "/" },
    { page: "Poupança", icon: <PiggyBankIcon />, href: "/savings" },
    { page: "Carteira", icon: <WalletCardsIcon />, href: "/wallet" },
  ];

  return (
    <nav className="flex gap-5 xl:flex-col">
      {pages.map((page) => (
        <NavButton key={page.href} page={page} />
      ))}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="nav">
            <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle>Transaction/Bank</DialogTitle>
            </DialogHeader>
          </VisuallyHidden>

          <DialogTabs
            banks={banks}
            closeDialog={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Button size="icon" variant="nav" className={cn("md:hidden")}>
        <ArrowRightLeftIcon />
      </Button>
    </nav>
  );
};

export default Menu;

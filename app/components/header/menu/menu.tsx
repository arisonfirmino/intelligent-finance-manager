import NavButton from "@/app/components/header/menu/nav-button";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

import {
  ArrowRightLeftIcon,
  HomeIcon,
  PiggyBankIcon,
  PlusIcon,
  WalletCardsIcon,
} from "lucide-react";

const Manu = ({ userId }: { userId: string }) => {
  const pages = [
    { page: "Home", icon: <HomeIcon />, href: "/" },
    { page: "Poupança", icon: <PiggyBankIcon />, href: `/savings/${userId}` },
    { page: "Carteira", icon: <WalletCardsIcon />, href: `/wallet/${userId}` },
  ];

  return (
    <nav className="flex gap-5 xl:flex-col">
      {pages.map((page) => (
        <NavButton key={page.href} page={page} />
      ))}

      <Button size="icon" variant="nav">
        <PlusIcon />
      </Button>

      <Button size="icon" variant="nav" className={cn("md:hidden")}>
        <ArrowRightLeftIcon />
      </Button>
    </nav>
  );
};

export default Manu;

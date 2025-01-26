import NavButton from "@/app/components/header/menu/nav-button";

import TransactionDialog from "@/app/components/header/menu/transaction-dialog";
import LateralMenu from "@/app/components/header/menu/lateral-menu";

import { HomeIcon, PiggyBankIcon, WalletCardsIcon } from "lucide-react";

import { Bank } from "@prisma/client";

const Menu = ({ banks }: { banks: Bank[] }) => {
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

      <TransactionDialog banks={banks} />

      <div className="md:hidden">
        <LateralMenu />
      </div>
    </nav>
  );
};

export default Menu;

import NavButton from "@/app/components/header/menu/nav-button";

import TransactionDialog from "@/app/components/header/menu/transaction-dialog";

import { HomeIcon, PiggyBankIcon, WalletCardsIcon } from "lucide-react";

import { Bank } from "@prisma/client";

const Menu = ({ userId, banks }: { userId: string; banks: Bank[] }) => {
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

      <TransactionDialog banks={banks} />
    </nav>
  );
};

export default Menu;

"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import WalletBankCard from "@/app/(pages)/wallet/components/wallet-bank-card";
import TransactionsList from "@/app/components/transaction/transactions-list";
import { Button } from "@/app/components/ui/button";
import BankLogo from "@/app/components/bank/bank-logo";

import { LandmarkIcon } from "lucide-react";

import { Prisma } from "@prisma/client";
import DeleteBankButton from "@/app/components/bank/delete-bank-button";

interface WalletWrapperProps {
  banks: Prisma.BankGetPayload<{
    include: {
      incomes: { include: { bank: true } };
      expenses: { include: { bank: true } };
    };
  }>[];
}

const WalletWrapper = ({ banks }: WalletWrapperProps) => {
  const [selectedBank, setSelectedBank] = useState(banks[0]);

  const transactions = [...selectedBank.incomes, ...selectedBank.expenses].sort(
    (a, b) => {
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison !== 0) return dateComparison;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  );

  return (
    <>
      <div className="order-2 w-full space-y-5 md:order-1">
        <WalletBankCard bank={selectedBank} />

        <DeleteBankButton bankId={selectedBank.id} />

        <TransactionsList
          transactions={transactions}
          bank={selectedBank.name}
        />
      </div>

      <div className="order-1 flex h-fit w-full flex-col gap-5 rounded-lg border p-2.5 md:order-2">
        <div className="flex items-center gap-2">
          <LandmarkIcon size={16} />
          <p className="text-sm font-medium">Bancos</p>
        </div>

        {banks.map((bank) => (
          <Button
            key={bank.id}
            variant="nav"
            onClick={() => setSelectedBank(bank)}
            className={cn(
              "justify-normal text-muted-foreground hover:text-foreground",
              selectedBank === bank && "border bg-secondary text-foreground",
            )}
          >
            <BankLogo logo={bank.logo} name={bank.name} size="h-5 w-5" />
            {bank.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default WalletWrapper;

"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import BankDetails from "@/app/(home)/components/balance/bank-details";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Prisma } from "@prisma/client";

interface BalanceProps {
  user: Pick<
    Prisma.UserGetPayload<{ include: { banks: true } }>,
    "balance" | "banks"
  >;
}

const Balance = ({ user }: BalanceProps) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <Card className={cn("relative p-2.5")}>
      <CardHeader>
        <CardTitle className={cn("text-xs text-muted-foreground")}>
          Seu saldo
        </CardTitle>
        <p className="text-lg font-semibold">
          {isBalanceHidden ? "******" : formatCurrency(Number(user.balance))}
        </p>
      </CardHeader>

      <button
        onClick={() => setIsBalanceHidden(!isBalanceHidden)}
        className="absolute right-2.5 top-2.5 text-muted-foreground"
      >
        {isBalanceHidden ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
      </button>

      {user.banks.length > 0 && (
        <CardFooter>
          <BankDetails banks={user.banks} isBalanceHidden={isBalanceHidden} />
        </CardFooter>
      )}
    </Card>
  );
};

export default Balance;

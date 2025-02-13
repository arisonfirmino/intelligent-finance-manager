import { cn } from "@/app/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { PiggyBankIcon } from "lucide-react";

import { Savings } from "@prisma/client";

interface SavingsBalanceProps {
  savings: Pick<Savings, "current_balance">;
}

const SavingsBalance = ({ savings }: SavingsBalanceProps) => {
  return (
    <Card className={cn("w-full space-y-5 p-2.5")}>
      <CardHeader className={cn("flex items-center gap-2.5")}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border">
          <PiggyBankIcon size={16} className="text-primary" />
        </div>
        <CardTitle className={cn("text-sm font-medium")}>Poupança</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-xs text-muted-foreground">Guardado:</p>
        <p className="text-sm font-semibold">
          {formatCurrency(Number(savings.current_balance))}
        </p>
      </CardContent>
    </Card>
  );
};

export default SavingsBalance;

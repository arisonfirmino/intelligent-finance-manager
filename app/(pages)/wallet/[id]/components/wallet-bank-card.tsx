import { cn } from "@/app/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import BankLogo from "@/app/components/bank/bank-logo";
import CardChip from "@/app/(pages)/wallet/[id]/components/card-chip";
import BankTotalAmount from "@/app/(pages)/wallet/[id]/components/bank-total-amount";
import BankAmount from "@/app/components/bank/bank-amount";

import { Bank } from "@prisma/client";

interface WalletBankCardProps {
  bank: Bank;
}

const WalletBankCard = ({ bank }: WalletBankCardProps) => {
  return (
    <Card
      className={cn(
        "flex h-40 flex-col justify-between border-input bg-gradient-to-l from-muted to-secondary p-2.5",
      )}
    >
      <CardHeader className={cn("flex items-center justify-between")}>
        <div className="flex items-center gap-1.5">
          <BankLogo logo={bank.logo} name={bank.name} size="h-4 w-4" />
          <CardTitle>{bank.name}</CardTitle>
        </div>

        <CardChip />
      </CardHeader>

      <CardContent className={cn("flex items-end justify-between")}>
        <div className="space-y-2.5">
          <BankTotalAmount type="incomes" value={Number(bank.total_incomes)} />
          <BankTotalAmount
            type="expenses"
            value={Number(bank.total_expenses)}
          />
        </div>

        <div className="space-y-1">
          <BankAmount
            title="Saldo inicial"
            value={Number(bank.initial_value)}
            align="right"
          />
          <BankAmount
            title="Saldo disponível"
            value={Number(bank.current_balance)}
            align="right"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletBankCard;

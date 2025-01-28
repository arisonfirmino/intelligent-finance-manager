import { cn } from "@/app/lib/utils";

import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import BankLogo from "@/app/components/bank/bank-logo";
import BankAmount from "@/app/components/bank/bank-amount";

import { Bank } from "@prisma/client";

const BankCard = ({ bank }: { bank: Bank }) => {
  return (
    <Card
      className={cn(
        "flex h-[186px] w-full max-w-52 flex-col justify-between rounded-b-none border-b-0 border-input bg-gradient-to-t from-muted to-secondary p-2.5",
      )}
    >
      <CardHeader className={cn("flex items-center justify-end gap-1.5")}>
        <BankLogo logo={bank.logo} name={bank.name} />
        <CardTitle className={cn("text-sm")}>{bank.name}</CardTitle>
      </CardHeader>

      <BankAmount
        title="Saldo inicial"
        value={Number(bank.initial_value)}
        align="left"
      />

      <BankAmount
        title="Saldo disponivel"
        value={Number(bank.current_balance)}
        align="right"
      />
    </Card>
  );
};

export default BankCard;

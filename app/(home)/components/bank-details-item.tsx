import BankLogo from "@/app/components/bank-logo";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Bank } from "@prisma/client";

interface BankDetailsItemProps {
  bank: Pick<Bank, "id" | "name" | "logo" | "current_balance">;
  isBalanceHidden: boolean;
}

const BankDetailsItem = ({ bank, isBalanceHidden }: BankDetailsItemProps) => {
  return (
    <div key={bank.id} className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <BankLogo name={bank.name} logo={bank.logo} />
        <p>{bank.name}</p>
      </div>
      <p className="font-medium">
        {isBalanceHidden
          ? "******"
          : formatCurrency(Number(bank.current_balance))}
      </p>
    </div>
  );
};

export default BankDetailsItem;

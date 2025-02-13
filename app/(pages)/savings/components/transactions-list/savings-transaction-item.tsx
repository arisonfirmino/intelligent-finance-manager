import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react";

import { formatDate } from "@/app/helpers/formatDate";
import { formatCurrency } from "@/app/helpers/formatCurrency";

import { SavingsTransaction } from "@prisma/client";

interface SavingsTransactionItemProps {
  transaction: SavingsTransaction;
}

const SavingsTransactionItem = ({
  transaction,
}: SavingsTransactionItemProps) => {
  return (
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        {transaction.type === "deposit" ? (
          <CircleArrowUpIcon size={14} className="text-green-500" />
        ) : (
          <CircleArrowDownIcon size={14} className="text-red-600" />
        )}
        <p className="text-xs text-muted-foreground">
          {formatDate(transaction.date)}
        </p>
      </div>

      <p className="text-sm font-medium">
        {formatCurrency(Number(transaction.value))}
      </p>
    </div>
  );
};

export default SavingsTransactionItem;

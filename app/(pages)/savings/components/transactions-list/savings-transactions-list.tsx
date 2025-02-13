import SavingsTransactionItem from "@/app/(pages)/savings/components/transactions-list/savings-transaction-item";
import ResetSavingsButton from "@/app/(pages)/savings/components/transactions-list/reset-savings-button";

import { HandCoinsIcon } from "lucide-react";

import { SavingsTransaction } from "@prisma/client";

interface SavingsTransactionListProps {
  transactions: SavingsTransaction[];
  userId: string;
}

const SavingsTransactionList = ({
  transactions,
  userId,
}: SavingsTransactionListProps) => {
  const sortedTransactions = transactions.sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="relative h-fit w-full space-y-2.5 rounded-lg border p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <HandCoinsIcon size={16} />
          <p className="truncate font-medium">Histórico</p>
        </div>

        {transactions.length > 0 && <ResetSavingsButton userId={userId} />}
      </div>

      <ul className="space-y-5">
        {transactions.length > 0 ? (
          sortedTransactions.map((transaction) => (
            <li key={transaction.id}>
              <SavingsTransactionItem transaction={transaction} />
            </li>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Seu histórico está vazio. Adicione uma nova transação!
          </p>
        )}
      </ul>
    </div>
  );
};

export default SavingsTransactionList;

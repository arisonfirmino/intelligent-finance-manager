import TransactionItem from "@/app/components/transaction/transaction-item";

import { ArrowRightLeftIcon } from "lucide-react";

import { Prisma } from "@prisma/client";

interface TransactionsListProps {
  transactions:
    | Prisma.IncomeGetPayload<{
        include: { bank: true };
      }>[]
    | Prisma.ExpenseGetPayload<{
        include: { bank: true };
      }>[];
}

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  return (
    <div className="h-fit w-full space-y-2.5 rounded-lg border p-2.5">
      <div className="flex items-center gap-2.5">
        <ArrowRightLeftIcon size={16} />
        <p className="font-medium">Transações</p>
      </div>

      {transactions.length > 0 ? (
        <ul className="w-full space-y-2.5">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <TransactionItem transaction={transaction} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Nenhuma transação registrada até agora. Adicione sua primeira
          transação!
        </p>
      )}
    </div>
  );
};

export default TransactionsList;

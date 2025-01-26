import TransactionItem from "@/app/components/transaction/transaction-item";

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
    <ul className="w-full space-y-2.5">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;

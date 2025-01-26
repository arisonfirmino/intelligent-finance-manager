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
  return transactions.length > 0 ? (
    <ul className="w-full space-y-2.5">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <TransactionItem transaction={transaction} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-sm text-muted-foreground">
      Nenhuma transação registrada até agora. Adicione sua primeira transação!
    </p>
  );
};

export default TransactionsList;

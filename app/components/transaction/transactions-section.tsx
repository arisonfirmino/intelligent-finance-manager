import { getUserSession } from "@/app/helpers/fetchUserData";

import TransactionsList from "@/app/components/transaction/transactions-list";

import { ArrowRightLeftIcon } from "lucide-react";

const TransactionsSection = async () => {
  const user = await getUserSession();

  if (!user) return null;

  const transactions = [...user.incomes, ...user.expenses].sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center gap-2.5">
        <ArrowRightLeftIcon size={16} />
        <p className="font-medium">Transações</p>
      </div>
      <TransactionsList
        transactions={JSON.parse(JSON.stringify(transactions))}
      />
    </div>
  );
};

export default TransactionsSection;

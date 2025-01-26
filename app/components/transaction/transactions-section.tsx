import { getUserSession } from "@/app/helpers/fetchUserData";

import TransactionsList from "@/app/components/transaction/transactions-list";

import { ArrowRightLeftIcon } from "lucide-react";

const TransactionsSection = async () => {
  const user = await getUserSession();

  if (!user) return null;

  const transactions = JSON.parse(
    JSON.stringify([...user.incomes, ...user.expenses]),
  );

  return (
    <div className="w-full space-y-2.5">
      <div className="flex items-center gap-2.5">
        <ArrowRightLeftIcon size={16} />
        <p className="font-medium">Transações</p>
      </div>
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default TransactionsSection;

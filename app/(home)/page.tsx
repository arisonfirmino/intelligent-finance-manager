import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/app/lib/prisma";

import Container from "@/app/components/container";
import Balance from "@/app/(home)/components/balance/balance";
import BanksList from "@/app/(home)/components/bank/banks-list";
import TotalAmount from "@/app/(home)/components/totals/total-amount";
import TransactionsChart from "@/app/(home)/components/transactions-chart";
import TransactionsList from "@/app/components/transaction/transactions-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      banks: true,
      incomes: { include: { bank: true } },
      expenses: { include: { bank: true } },
    },
  });

  if (!user) return null;

  const transactions = [...user.incomes, ...user.expenses].sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Container>
      <div className="w-full space-y-5">
        <Balance user={JSON.parse(JSON.stringify(user))} />

        {user.banks.length > 0 ? (
          <BanksList banks={JSON.parse(JSON.stringify(user.banks))} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Você ainda não adicionou bancos.
          </p>
        )}

        <div className="flex gap-5">
          <TotalAmount
            type="income"
            value={Number(user.total_incomes)}
            banks={JSON.parse(JSON.stringify(user.banks))}
          />
          <TotalAmount
            type="expense"
            value={Number(user.total_expenses)}
            banks={JSON.parse(JSON.stringify(user.banks))}
          />
        </div>

        {transactions.length > 0 && (
          <TransactionsChart
            transactions={JSON.parse(JSON.stringify(transactions))}
          />
        )}
      </div>

      <TransactionsList
        transactions={JSON.parse(JSON.stringify(transactions))}
      />
    </Container>
  );
};

export default Home;

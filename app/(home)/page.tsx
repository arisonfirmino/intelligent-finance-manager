import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";
import Balance from "@/app/(home)/components/balance";
import TransactionsList from "@/app/components/transaction/transactions-list";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUserSession();

  if (!user) return null;

  const transactions = [...user.incomes, ...user.expenses].sort((a, b) => {
    const dateComparison =
      new Date(b.date).getTime() - new Date(a.date).getTime();
    if (dateComparison !== 0) return dateComparison;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <Container>
      <div className="w-full">
        <Balance user={JSON.parse(JSON.stringify(user))} />
      </div>
      <TransactionsList
        transactions={JSON.parse(JSON.stringify(transactions))}
      />
    </Container>
  );
};

export default Home;

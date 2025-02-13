import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import Container from "@/app/components/container";
import SavingsOverview from "@/app/(pages)/savings/components/overview/savings-overview";
import SavingsTransactionList from "@/app/(pages)/savings/components/transactions-list/savings-transactions-list";
import CreateSavings from "@/app/(pages)/savings/components/create-savings";

const SavingsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      savings: {
        include: {
          transactions: true,
        },
      },
    },
  });

  if (!user) return null;

  const savings =
    user.savings.length > 0 && JSON.parse(JSON.stringify(user.savings[0]));

  return (
    <Container>
      {user.savings.length > 0 ? (
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <SavingsOverview savings={savings} userId={user.id} />
          <SavingsTransactionList
            transactions={savings.transactions}
            userId={user.id}
          />
        </div>
      ) : (
        <CreateSavings userId={user.id} />
      )}
    </Container>
  );
};

export default SavingsPage;

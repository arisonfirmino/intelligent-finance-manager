import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";
import Balance from "@/app/(home)/components/balance";
import TransactionsSection from "@/app/components/transaction/transactions-section";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUserSession();

  if (!user) return null;

  return (
    <Container>
      <div className="w-full">
        <Balance user={JSON.parse(JSON.stringify(user))} />
      </div>

      <div className="hidden h-fit w-full rounded-lg border p-2.5 md:flex">
        <TransactionsSection />
      </div>
    </Container>
  );
};

export default Home;

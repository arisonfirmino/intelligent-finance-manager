import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";
import Balance from "@/app/(home)/components/balance";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUserSession();

  if (!user) return null;

  return (
    <Container>
      <div>
        <Balance user={JSON.parse(JSON.stringify(user))} />
      </div>
    </Container>
  );
};

export default Home;

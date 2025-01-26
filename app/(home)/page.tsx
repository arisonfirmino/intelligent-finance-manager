import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  const user = await getUserSession();

  if (!user) return null;

  return <Container>Hello world!</Container>;
};

export default Home;

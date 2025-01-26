import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  return <>Hello world!</>;
};

export default Home;

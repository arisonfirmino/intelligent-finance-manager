import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";

const Home = async () => {
  const user = getUserSession();

  if (!user) return null;

  return <Container>Hello world!</Container>;
};

export default Home;

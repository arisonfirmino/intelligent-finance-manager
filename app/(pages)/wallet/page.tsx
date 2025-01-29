import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";
import WalletWrapper from "@/app/(pages)/wallet/components/wallet-wrapper";

const WalletPage = async () => {
  const user = await getUserSession();

  if (!user) return null;

  return (
    <Container>
      <WalletWrapper banks={JSON.parse(JSON.stringify(user.banks))} />
    </Container>
  );
};

export default WalletPage;

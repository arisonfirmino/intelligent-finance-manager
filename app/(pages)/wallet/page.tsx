import { getUserSession } from "@/app/helpers/fetchUserData";

import Container from "@/app/components/container";
import WalletWrapper from "@/app/(pages)/wallet/components/wallet-wrapper";

const WalletPage = async () => {
  const user = await getUserSession();

  if (!user) return null;

  return (
    <Container>
      {user.banks.length > 0 ? (
        <WalletWrapper banks={JSON.parse(JSON.stringify(user.banks))} />
      ) : (
        <p className="text-center text-sm text-muted-foreground">
          Você ainda não adicionou bancos.
        </p>
      )}
    </Container>
  );
};

export default WalletPage;

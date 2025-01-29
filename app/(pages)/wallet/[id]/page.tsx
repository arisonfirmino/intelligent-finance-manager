import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

import Container from "@/app/components/container";
import WalletWrapper from "@/app/(pages)/wallet/[id]/components/wallet-wrapper";

const WalletPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);

  const resolvedParams = await params;

  if (!session) redirect("/signin");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      banks: {
        include: {
          incomes: { include: { bank: true } },
          expenses: { include: { bank: true } },
        },
      },
    },
  });

  if (!user) return null;

  if (user.id !== resolvedParams.id) redirect("/");

  return (
    <Container>
      <WalletWrapper banks={JSON.parse(JSON.stringify(user.banks))} />
    </Container>
  );
};

export default WalletPage;

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return;

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      banks: true,
      incomes: true,
      expenses: true,
    },
  });

  return user;
};

"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

const getUserWithSavings = async (userId: string) => {
  if (!userId) throw new Error("ID de usuário não fornecido.");

  const user = await db.user.findUnique({
    where: { id: userId },
    include: { savings: true },
  });

  if (!user) return { error: "Usuário não encontrado." };
  return user;
};

export const createSavings = async ({ userId }: { userId: string }) => {
  const user = await getUserWithSavings(userId);
  if ("error" in user) return user;

  if (user.savings.length > 0)
    return { error: "Usuário já possui uma poupança." };

  await db.savings.create({ data: { userId } });

  revalidatePath("/");
};

export const updateSavingsGoal = async ({
  userId,
  goal,
}: {
  userId: string;
  goal: number;
}) => {
  const user = await getUserWithSavings(userId);
  if ("error" in user) return user;

  if (user.savings.length === 0)
    return { error: "Usuário não possui uma poupança." };

  await db.savings.update({
    where: { id: user.savings[0].id },
    data: { goal },
  });

  revalidatePath("/");
};

export const createSavingsTransaction = async ({
  userId,
  value,
  type,
  date,
}: {
  userId: string;
  value: number;
  type: "deposit" | "withdraw";
  date: Date;
}) => {
  const user = await getUserWithSavings(userId);
  if ("error" in user) return user;

  const savings = user.savings[0];

  if (!savings) return { error: "Usuário não possui uma poupança." };
  if (!value || !type || !date)
    return { error: "Todos os campos são obrigatórios." };
  if (type === "withdraw" && Number(value) > Number(savings.current_balance))
    return { error: "Saldo insuficiente para retirada." };

  await db.savingsTransaction.create({
    data: { userId, savingsId: savings.id, value, type, date },
  });

  await db.savings.update({
    where: { id: savings.id },
    data: {
      current_balance:
        type === "deposit" ? { increment: value } : { decrement: value },
    },
  });

  revalidatePath("/");
};

export const resetSavings = async ({ userId }: { userId: string }) => {
  const user = await getUserWithSavings(userId);
  if ("error" in user) return user;

  const savings = user.savings[0];

  if (!savings) return { error: "Usuário não possui uma poupança." };

  await db.savingsTransaction.deleteMany({ where: { savingsId: savings.id } });
  await db.savings.update({
    where: { id: savings.id },
    data: { current_balance: 0 },
  });

  revalidatePath("/");
};

"use server";

import { db } from "@/app/lib/prisma";

export const findUser = async (userId: string) => {
  if (!userId) return { error: "ID de usuário não fornecido." };

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) return { error: "Usuário não encontrado." };

  return user;
};

export const findBank = async (bankId: string) => {
  if (!bankId) return { error: "ID do banco não fornecido." };

  const bank = await db.bank.findUnique({ where: { id: bankId } });

  if (!bank) return { error: "Banco não encontrado." };

  return bank;
};

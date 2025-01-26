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

export const findTransaction = async (
  transactionId: string,
  type: "income" | "expense",
) => {
  if (!transactionId) return { error: "ID da transação não fornecido." };

  const transaction =
    type === "income"
      ? await db.income.findUnique({ where: { id: transactionId } })
      : await db.expense.findUnique({ where: { id: transactionId } });

  if (!transaction) return { error: "Transação não encontrada." };

  return transaction;
};

export const updateBalances = async (
  userId: string,
  bankId: string,
  value: number,
  type: "income" | "expense",
) => {
  const isIncome = type === "income";

  await db.user.update({
    where: { id: userId },
    data: {
      balance: isIncome ? { increment: value } : { decrement: value },
      total_incomes: isIncome ? { increment: value } : undefined,
      total_expenses: !isIncome ? { increment: value } : undefined,
    },
  });

  await db.bank.update({
    where: { id: bankId },
    data: {
      current_balance: isIncome ? { increment: value } : { decrement: value },
    },
  });
};

export const updateBalancesAfterDeletion = async (
  userId: string,
  bankId: string,
  value: number,
  type: "income" | "expense",
) => {
  const isIncome = type === "income";

  await db.user.update({
    where: { id: userId },
    data: {
      balance: isIncome ? { decrement: value } : { increment: value },
      total_incomes: isIncome ? { decrement: value } : undefined,
      total_expenses: !isIncome ? { decrement: value } : undefined,
    },
  });

  await db.bank.update({
    where: { id: bankId },
    data: {
      current_balance: isIncome ? { decrement: value } : { increment: value },
    },
  });
};

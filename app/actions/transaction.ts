"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  findBank,
  findTransaction,
  findUser,
  updateBalances,
  updateBalancesAfterDeletion,
} from "@/app/helpers/dbHelpers";

interface AddTransactionProps {
  userId: string;
  bankId: string;
  type: "income" | "expense";
  name: string;
  value: number;
  date: Date;
}

interface DeleteTransactionProps {
  userId: string;
  type: "income" | "expense";
  transactionId: string;
}

export const addTransaction = async ({
  userId,
  bankId,
  type,
  name,
  value,
  date,
}: AddTransactionProps) => {
  const user = await findUser(userId);
  if ("error" in user) return user;

  const bank = await findBank(bankId);
  if ("error" in bank) return bank;

  if (!name || !type || !value || !date)
    return { error: "Campos não preenchidos." };

  if (type === "income") {
    await db.income.create({
      data: {
        userId,
        bankId,
        type,
        name,
        value,
        date,
      },
    });

    await updateBalances(userId, bankId, value, type);
  } else {
    await db.expense.create({
      data: {
        userId,
        bankId,
        type,
        name,
        value,
        date,
      },
    });

    await updateBalances(userId, bankId, value, type);
  }

  revalidatePath("/");
};

export const deleteTransaction = async ({
  userId,
  type,
  transactionId,
}: DeleteTransactionProps) => {
  const user = await findUser(userId);
  if ("error" in user) return user;

  if (!type) return { error: "Tipo de transação não fornecido." };

  if (!transactionId) return { error: "ID da transação não fornecido." };

  const transaction = await findTransaction(transactionId, type);
  if ("error" in transaction) return transaction;

  if (transaction.userId !== userId)
    return { error: "Essa transação pertence a outro usuário." };

  if (transaction.type === "income") {
    await db.income.delete({
      where: { id: transactionId },
    });
  } else {
    await db.expense.delete({
      where: { id: transactionId },
    });
  }

  const isIncome = type === "income";

  await updateBalancesAfterDeletion(
    userId,
    transaction.bankId,
    transaction.value.toNumber(),
    isIncome ? "income" : "expense",
  );

  revalidatePath("/");
};

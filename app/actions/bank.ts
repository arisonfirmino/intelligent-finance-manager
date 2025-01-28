"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

import { findUser, findBank } from "@/app/helpers/dbHelpers";

interface AddBankProps {
  userId: string;
  name: string;
  logo: string;
  initial_value: number;
}

export const addBank = async ({
  userId,
  name,
  logo,
  initial_value,
}: AddBankProps) => {
  if (!userId) return { error: "ID de usuário não fornecido." };

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      banks: true,
    },
  });

  if (!user) return { error: "Usuário não encontrado." };

  if (!name || !logo) return { error: "Banco não selecionado." };

  if (user.banks.find((bank) => bank.name === name))
    return { error: "Este banco já está cadatrado na sua conta." };

  await db.bank.create({
    data: {
      userId,
      name,
      logo,
      initial_value,
      current_balance: initial_value,
    },
  });

  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      balance: {
        increment: initial_value,
      },
    },
  });

  revalidatePath("/");
};

export const deleteBank = async ({
  userId,
  bankId,
}: {
  userId: string;
  bankId: string;
}) => {
  const user = await findUser(userId);
  if ("error" in user) return user;

  const bank = await findBank(bankId);
  if ("error" in bank) return bank;

  const { current_balance, total_incomes, total_expenses } = bank;

  await db.income.deleteMany({ where: { bankId } });
  await db.expense.deleteMany({ where: { bankId } });

  await db.user.update({
    where: { id: userId },
    data: {
      balance: {
        decrement: current_balance,
      },
      total_incomes: {
        decrement: total_incomes,
      },
      total_expenses: {
        decrement: total_expenses,
      },
    },
  });

  await db.bank.delete({ where: { id: bankId } });

  revalidatePath("/");
};

"use server";

import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

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

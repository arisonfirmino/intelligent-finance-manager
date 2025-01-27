"use client";

import { cn } from "@/app/lib/utils";

import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/app/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { ChartColumnBigIcon } from "lucide-react";

import { formatChartDate } from "@/app/helpers/formatDate";

import { Expense, Income } from "@prisma/client";

interface TransactionsChartProps {
  transactions: Income[] | Expense[];
}

const TransactionsChart = ({ transactions }: TransactionsChartProps) => {
  const chartData = transactions.reduce(
    (acc, transaction) => {
      const day = formatChartDate(transaction.date);

      const existingDay = acc.find((item) => item.day === day);

      if (existingDay) {
        if (transaction.type === "income") {
          existingDay.income += Number(transaction.value);
        } else {
          existingDay.expense += Number(transaction.value);
        }
      } else {
        acc.push({
          day,
          income: transaction.type === "income" ? Number(transaction.value) : 0,
          expense:
            transaction.type === "expense" ? Number(transaction.value) : 0,
        });
      }

      return acc;
    },
    [] as { day: string; income: number; expense: number }[],
  );

  const chartConfig = {
    income: {
      label: "Receitas",
      color: "#22c55e",
    },
    expense: {
      label: "Despesas",
      color: "#dc2626",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className={cn("flex items-center justify-between p-2.5")}>
        <CardTitle className={cn("text-sm font-medium")}>
          Resumo Diário de Transações
        </CardTitle>
        <ChartColumnBigIcon size={16} />
      </CardHeader>

      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" tickLine={false} axisLine={false} />
          <CartesianGrid vertical={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="income"
            fill={chartConfig.income.color}
            name={chartConfig.income.label}
            radius={4}
          />
          <Bar
            dataKey="expense"
            fill={chartConfig.expense.color}
            name={chartConfig.expense.label}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
};

export default TransactionsChart;

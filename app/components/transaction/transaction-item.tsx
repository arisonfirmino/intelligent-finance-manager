import Image from "next/image";

import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import DeleteTransactionButton from "@/app/components/transaction/delete-transaction-button";

import { DotIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";
import { formatDate } from "@/app/helpers/formatDate";

import { Prisma } from "@prisma/client";

interface TransactionItemProps {
  transaction:
    | Prisma.IncomeGetPayload<{
        include: {
          bank: true;
        };
      }>
    | Prisma.ExpenseGetPayload<{
        include: {
          bank: true;
        };
      }>;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={transaction.id}>
        <AccordionTrigger>
          <div className="flex items-center gap-1.5">
            {transaction.type === "income" && (
              <TrendingUpIcon size={14} className="text-green-500" />
            )}
            {transaction.type === "expense" && (
              <TrendingDownIcon size={14} className="text-red-600" />
            )}
            <p className="capitalize">{transaction.name}</p>
          </div>
        </AccordionTrigger>

        <AccordionContent className={cn("space-y-1.5")}>
          <div className="flex items-center gap-1.5">
            <p className="font-medium">
              {formatCurrency(Number(transaction.value))}
            </p>
            <DotIcon size={16} className="text-muted-foreground" />
            <div className="flex items-center gap-1.5">
              <Image
                src={transaction.bank.logo}
                alt={transaction.bank.name}
                height={246}
                width={246}
                className="mt-0.5 h-3.5 w-3.5 rounded"
              />
              <p>{transaction.bank.name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {formatDate(transaction.date)}
            </p>

            <DeleteTransactionButton
              transactionId={transaction.id}
              type={transaction.type as "income" | "expense"}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TransactionItem;

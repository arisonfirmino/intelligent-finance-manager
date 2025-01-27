import { cn } from "@/app/lib/utils";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import TotalAmountDetails from "@/app/(home)/components/totals/total-amount-details";

import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Bank } from "@prisma/client";

interface TotalAmountProps {
  type: "income" | "expense";
  value: number;
  banks: Bank[];
}

const TotalAmount = ({ type, value, banks }: TotalAmountProps) => {
  return (
    <Card className={cn("h-fit w-full p-1.5")}>
      <CardHeader>
        <CardTitle
          className={cn(
            "flex items-center gap-2 text-xs text-muted-foreground",
          )}
        >
          {type === "income" ? (
            <TrendingUpIcon size={14} className="text-green-500" />
          ) : (
            <TrendingDownIcon size={14} className="text-red-600" />
          )}
          {type === "income" ? "Receitas" : "Despesas"}
        </CardTitle>

        <p className="font-semibold">{formatCurrency(value)}</p>
      </CardHeader>

      <CardFooter>
        <TotalAmountDetails type={type} banks={banks} />
      </CardFooter>
    </Card>
  );
};

export default TotalAmount;

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

interface BankTotalAmountProps {
  type: "incomes" | "expenses";
  value: number;
}

const BankTotalAmount = ({ type, value }: BankTotalAmountProps) => {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-md ${type === "incomes" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-600"}`}
      >
        {type === "incomes" ? (
          <TrendingUpIcon size={14} />
        ) : (
          <TrendingDownIcon size={14} />
        )}
      </div>

      <p className="text-sm font-medium">{formatCurrency(value)}</p>
    </div>
  );
};

export default BankTotalAmount;

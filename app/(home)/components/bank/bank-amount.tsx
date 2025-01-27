import { formatCurrency } from "@/app/helpers/formatCurrency";

interface BankAmountProps {
  title: string;
  value: number;
  align: "left" | "right";
}

const BankAmount = ({ title, value, align }: BankAmountProps) => {
  return (
    <div className={align === "left" ? "text-left" : "text-right"}>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-sm font-medium">{formatCurrency(value)}</p>
    </div>
  );
};

export default BankAmount;

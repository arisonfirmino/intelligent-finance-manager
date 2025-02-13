import SavingsBalance from "@/app/(pages)/savings/components/summary-card/savings-balance";
import SavingsGoal from "@/app/(pages)/savings/components/summary-card/savings-goal";

import { Savings } from "@prisma/client";

interface SavingsSummaryCard {
  savings: Savings;
  userId: string;
}

const SavingsSummaryCard = ({ savings, userId }: SavingsSummaryCard) => {
  return (
    <div className="flex gap-2.5 rounded-xl border bg-secondary p-2.5">
      <SavingsBalance savings={savings} />
      <SavingsGoal savings={savings} userId={userId} />
    </div>
  );
};

export default SavingsSummaryCard;

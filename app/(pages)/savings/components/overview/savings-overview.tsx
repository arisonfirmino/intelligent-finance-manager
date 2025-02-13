import SavingsSummaryCard from "@/app/(pages)/savings/components/summary-card/savings-summary-card";
import SavingsTransactionDialog from "@/app/(pages)/savings/components/transaction-modal/savings-transaction-modal";
import SavingsProgress from "@/app/(pages)/savings/components/overview/savings-progress";

import { Savings } from "@prisma/client";

interface SavingsOverviewProps {
  savings: Savings;
  userId: string;
}

const SavingsOverview = ({ savings, userId }: SavingsOverviewProps) => {
  return (
    <div className="w-full space-y-2.5">
      <SavingsSummaryCard savings={savings} userId={userId} />
      <SavingsTransactionDialog userId={userId} />
      <SavingsProgress savings={savings} />
    </div>
  );
};

export default SavingsOverview;

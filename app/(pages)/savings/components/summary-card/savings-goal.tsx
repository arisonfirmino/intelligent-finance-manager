import { cn } from "@/app/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import GoalProgress from "@/app/(pages)/savings/components/summary-card/goal-progress";
import UpdateGoal from "@/app/(pages)/savings/components/overview/update-goal";

import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Savings } from "@prisma/client";

interface SavingsGoalProps {
  savings: Pick<Savings, "current_balance" | "goal">;
  userId: string;
}

const SavingsGoal = ({ savings, userId }: SavingsGoalProps) => {
  const progressPercentage = parseFloat(
    ((Number(savings.current_balance) / Number(savings.goal)) * 100).toFixed(1),
  );

  return (
    <Card className={cn("relative w-full space-y-5 p-2.5")}>
      <CardHeader className={cn("flex items-center gap-2.5")}>
        <GoalProgress
          progressPercentage={progressPercentage ? progressPercentage : 0}
        />
        <div className="flex flex-col items-start">
          <CardTitle className={cn("text-sm font-medium")}>Objetivo</CardTitle>
          <UpdateGoal userId={userId} />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-xs text-muted-foreground">Valor da meta:</p>
        <p className="text-sm font-semibold">
          {formatCurrency(Number(savings.goal))}
        </p>
      </CardContent>
    </Card>
  );
};

export default SavingsGoal;

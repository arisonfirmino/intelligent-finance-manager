import { formatCurrency } from "@/app/helpers/formatCurrency";

import { Savings } from "@prisma/client";

const SavingsProgress = ({ savings }: { savings: Savings }) => {
  const remainingAmount =
    Number(savings.goal) - Number(savings.current_balance);

  return (
    Number(savings.goal) > 0 && (
      <p className="text-center text-sm text-muted-foreground">
        {remainingAmount <= 0 ? (
          <span className="font-medium text-foreground">
            🎉 Parabéns! Você atingiu sua meta! Agora é hora de aproveitar os
            frutos do seu esforço. 🚀
          </span>
        ) : (
          <>
            Falta{" "}
            <span className="font-medium text-foreground">
              {formatCurrency(remainingAmount)}
            </span>{" "}
            para atingir seu objetivo.
          </>
        )}
      </p>
    )
  );
};

export default SavingsProgress;

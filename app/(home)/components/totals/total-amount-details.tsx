import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";

import { Bank } from "@prisma/client";
import BankLogo from "@/app/components/bank-logo";
import { formatCurrency } from "@/app/helpers/formatCurrency";

const TotalAmountDetails = ({
  type,
  banks,
}: {
  type: "income" | "expense";
  banks: Bank[];
}) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="details">
        <AccordionTrigger className={cn("font-normal")}>
          Detalhes
        </AccordionTrigger>

        <AccordionContent className={cn("space-y-2")}>
          {banks.map((bank) => (
            <div key={bank.id} className="flex items-center justify-between">
              <BankLogo logo={bank.logo} name={bank.name} />
              <p className="text-sm font-medium">
                {formatCurrency(
                  Number(
                    type === "income"
                      ? bank.total_incomes
                      : bank.total_expenses,
                  ),
                )}
              </p>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TotalAmountDetails;

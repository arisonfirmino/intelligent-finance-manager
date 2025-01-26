import { cn } from "@/app/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/components/ui/accordion";
import BankDetailsItem from "@/app/(home)/components/bank-details-item";

import { Bank } from "@prisma/client";

interface BankDetailsProps {
  banks: Pick<Bank, "id" | "name" | "logo" | "current_balance">[];
  isBalanceHidden: boolean;
}

const BankDetails = ({ banks, isBalanceHidden }: BankDetailsProps) => {
  return (
    <Accordion type="single" collapsible className={cn("w-full")}>
      <AccordionItem value="details">
        <AccordionTrigger className={cn("font-normal")}>
          Detalhes
        </AccordionTrigger>
        <AccordionContent className={cn("space-y-2")}>
          {banks.map((bank) => (
            <BankDetailsItem
              key={bank.id}
              bank={bank}
              isBalanceHidden={isBalanceHidden}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BankDetails;

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import TransactionsSection from "@/app/components/transaction/transactions-section";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ArrowRightLeftIcon } from "lucide-react";

const LateralMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="nav">
          <ArrowRightLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <VisuallyHidden>
          <SheetTitle>Transaçòes</SheetTitle>
        </VisuallyHidden>

        <TransactionsSection />
      </SheetContent>
    </Sheet>
  );
};
export default LateralMenu;

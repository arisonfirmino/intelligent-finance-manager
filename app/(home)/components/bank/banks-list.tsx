"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import BankCard from "@/app/(home)/components/bank/bank-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/app/components/ui/carousel";
import { Button } from "@/app/components/ui/button";
import BankLogo from "@/app/components/bank-logo";

import { Bank } from "@prisma/client";

const BanksList = ({ banks }: { banks: Bank[] }) => {
  const [selectedBank, setSelectedBank] = useState<Bank>(banks[0]);

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <BankCard bank={selectedBank} />

      <Carousel className={cn("max-w-[140px]")}>
        <CarouselContent className={cn("flex gap-2.5")}>
          {banks.map((bank) => (
            <CarouselItem key={bank.id} className={cn("max-h-10 max-w-10")}>
              <Button
                size="icon"
                variant="nav"
                onClick={() => setSelectedBank(bank)}
                className={cn(selectedBank === bank && "border bg-secondary")}
              >
                <BankLogo logo={bank.logo} name={bank.name} size="w-5 h-5" />
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default BanksList;

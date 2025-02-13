"use client";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { CircleArrowDownIcon, CircleArrowUpIcon } from "lucide-react";

interface SavingsTransactionButtonProps {
  transactionType: "deposit" | "withdraw";
  setTransactionType: (value: "deposit" | "withdraw") => void;
  openDialog: (value: boolean) => void;
}

const SavingsTransactionButton = ({
  transactionType,
  setTransactionType,
  openDialog,
}: SavingsTransactionButtonProps) => {
  return (
    <Button
      onClick={() => {
        setTransactionType(transactionType);
        openDialog(true);
      }}
      variant="outline"
      className={cn("w-full")}
    >
      {transactionType === "deposit" ? (
        <CircleArrowUpIcon className="text-green-500" />
      ) : (
        <CircleArrowDownIcon className="text-red-600" />
      )}
      {transactionType === "deposit" ? "Guardar" : "Retirar"}
    </Button>
  );
};

export default SavingsTransactionButton;

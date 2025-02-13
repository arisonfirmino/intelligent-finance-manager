"use client";

import { useState } from "react";

import SavingsTransactionActions from "@/app/(pages)/savings/components/transaction-modal/savings-transaction-actions";
import SavingsTransactionDialog from "@/app/(pages)/savings/components/transaction-modal/savings-transaction-dialog";

const SavingsTransactionModal = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<
    "deposit" | "withdraw"
  >("deposit");

  return (
    <>
      <SavingsTransactionActions
        setTransactionType={setTransactionType}
        openDialog={setIsOpen}
      />
      <SavingsTransactionDialog
        userId={userId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        transactionType={transactionType}
      />
    </>
  );
};

export default SavingsTransactionModal;

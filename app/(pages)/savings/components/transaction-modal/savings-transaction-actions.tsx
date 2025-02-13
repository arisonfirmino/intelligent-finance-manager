import NewSavingsTransactionButton from "@/app/(pages)/savings/components/transaction-modal/savings-transaction-button";

interface SavingsTransactionActionsProps {
  setTransactionType: (type: "deposit" | "withdraw") => void;
  openDialog: (open: boolean) => void;
}

const SavingsTransactionActions = ({
  setTransactionType,
  openDialog,
}: SavingsTransactionActionsProps) => {
  return (
    <div className="flex items-center gap-5">
      <NewSavingsTransactionButton
        transactionType="deposit"
        setTransactionType={setTransactionType}
        openDialog={openDialog}
      />
      <NewSavingsTransactionButton
        transactionType="withdraw"
        setTransactionType={setTransactionType}
        openDialog={openDialog}
      />
    </div>
  );
};

export default SavingsTransactionActions;

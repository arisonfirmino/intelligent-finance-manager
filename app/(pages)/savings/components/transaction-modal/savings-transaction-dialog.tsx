import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import NewSavingsTransactionForm from "@/app/(pages)/savings/components/transaction-modal/savings-transaction-form";

interface SavingsTransactionDialogProps {
  userId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  transactionType: "deposit" | "withdraw";
}

const SavingsTransactionDialog = ({
  userId,
  isOpen,
  setIsOpen,
  transactionType,
}: SavingsTransactionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {transactionType === "deposit"
              ? "Guardar dinheiro"
              : "Retirar dinheiro"}
          </DialogTitle>
          <DialogDescription>
            {transactionType === "deposit"
              ? "Informe o valor que deseja adicionar à sua poupança."
              : "Informe o valor que deseja retirar da sua poupança."}
          </DialogDescription>
        </DialogHeader>

        <NewSavingsTransactionForm
          userId={userId}
          transactionType={transactionType}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SavingsTransactionDialog;

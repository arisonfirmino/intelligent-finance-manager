"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { cn } from "@/app/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

import { deleteTransaction } from "@/app/actions/transaction";

import { toast } from "sonner";

const DeleteTransactionButton = ({
  transactionId,
  type,
}: {
  transactionId: string;
  type: "income" | "expense";
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDeleteClick = async () => {
    if (!session) return;

    setIsLoading(true);

    await deleteTransaction({ userId: session.user.id, transactionId, type });

    setIsLoading(false);
    toast(`${type === "income" ? "Receita" : "Despesa"} deletada.`);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600">
          {isLoading ? (
            <LoaderCircleIcon size={14} className="animate-spin" />
          ) : (
            <Trash2Icon size={14} />
          )}
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir esta transação?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Após a exclusão, não será possível recuperar os dados desta
            transação.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>Cancelar</Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              onClick={handleDeleteClick}
              size="icon"
              className={cn(
                "border-none bg-red-600 text-white hover:bg-secondary hover:text-muted-foreground",
              )}
            >
              {isLoading ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                <Trash2Icon />
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionButton;

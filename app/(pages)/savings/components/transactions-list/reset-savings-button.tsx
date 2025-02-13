"use client";

import { useState } from "react";

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

import { resetSavings } from "@/app/actions/savings";

const ResetSavingsButton = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetClick = async () => {
    setIsLoading(true);

    await resetSavings({ userId });

    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className={cn(
          "text-xs text-red-600 hover:text-muted-foreground hover:underline",
          isLoading && "text-muted-foreground",
        )}
      >
        {isLoading ? "carregando" : "resetar"}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja resetar?</AlertDialogTitle>
          <AlertDialogDescription>
            Isso apagará todas as transações da sua poupança e essa ação não
            poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleResetClick}
            className={cn("bg-red-600 hover:bg-secondary hover:text-red-600")}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetSavingsButton;

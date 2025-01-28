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

import { deleteBank } from "@/app/actions/bank";

import { toast } from "sonner";

const DeleteBankButton = ({ bankId }: { bankId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleDeleteClick = async () => {
    if (!session) return;

    setIsLoading(true);

    await deleteBank({ bankId, userId: session.user.id });

    setIsLoading(false);
    toast("Banco deletado.");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={isLoading}
          className={cn(
            "w-full justify-between border-none bg-red-600 uppercase text-white hover:bg-secondary hover:text-muted-foreground",
          )}
        >
          {isLoading ? "Deletando" : "Deletar banco"}
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir este banco?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Após a exclusão, não será possível recuperar os dados deste banco.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" className={cn("uppercase")}>
              Cancelar
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              onClick={handleDeleteClick}
              className={cn(
                "border-none bg-red-600 uppercase text-white hover:bg-secondary hover:text-muted-foreground",
              )}
            >
              Confirmar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBankButton;

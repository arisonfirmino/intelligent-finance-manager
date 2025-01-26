"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import DialogTabs from "@/app/components/header/menu/dialog-tabs";
import { Button } from "@/app/components/ui/button";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { PlusIcon } from "lucide-react";

import { Bank } from "@prisma/client";

const TransactionDialog = ({ banks }: { banks: Bank[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="nav">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>Transaction/Bank</DialogTitle>
        </VisuallyHidden>

        <DialogTabs banks={banks} closeDialog={() => setIsDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;

"use client";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import InputValue from "@/app/components/input-value";
import SubmitButton from "@/app/components/submit-button";

import { updateSavingsGoal } from "@/app/actions/savings";

const schema = yup.object({
  value: yup.number().min(0.01).required(),
});

type FormData = yup.InferType<typeof schema>;

const UpdateGoal = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    await updateSavingsGoal({ userId, goal: data.value / 100 });

    reset();
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={cn(
          "text-xs text-muted-foreground hover:text-primary hover:underline",
        )}
      >
        editar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Defina sua nova meta de economia</DialogTitle>
          <DialogDescription>
            Defina o novo valor para sua meta de economia e atualize seu
            progresso.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="value"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputValue
                value={value}
                onChange={onChange}
                error={errors.value}
              />
            )}
          />

          <SubmitButton isLoading={isLoading}>Atualizar</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoal;

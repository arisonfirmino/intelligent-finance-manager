"use client";

import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputValue from "@/app/components/input-value";
import DatePicker from "@/app/components/date-picker";
import SubmitButton from "@/app/components/submit-button";

import { createSavingsTransaction } from "@/app/actions/savings";

const schema = yup.object({
  value: yup.number().min(0.01).required(),
});

type FormData = yup.InferType<typeof schema>;

interface SavingsTransactionFormProps {
  userId: string;
  transactionType: "deposit" | "withdraw";
  setIsOpen: (value: boolean) => void;
}

const SavingsTransactionForm = ({
  userId,
  transactionType,
  setIsOpen,
}: SavingsTransactionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!date) {
      setErrorMessage("Selecione uma data antes de continuar.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const result = await createSavingsTransaction({
      userId,
      value: data.value / 100,
      type: transactionType,
      date,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMessage && (
        <p className="text-center text-xs text-red-600">{errorMessage}</p>
      )}

      <Controller
        name="value"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputValue value={value} onChange={onChange} error={errors.value} />
        )}
      />

      <DatePicker date={date} setDate={setDate} />

      <SubmitButton isLoading={isLoading}>
        {transactionType === "deposit" ? "Adicionar" : "Retirar"}
      </SubmitButton>
    </form>
  );
};

export default SavingsTransactionForm;

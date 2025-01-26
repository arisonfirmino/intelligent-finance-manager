"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { cn } from "@/app/lib/utils";

import { Input } from "@/app/components/ui/input";
import InputValue from "@/app/components/input-value";
import SelectType from "@/app/components/select-type";
import SelectBank from "@/app/components/select-bank";
import DatePicker from "@/app/components/date-picker";
import SubmitButton from "@/app/components/submit-button";

import { addTransaction } from "@/app/actions/transaction";

import { toast } from "sonner";

import { Bank } from "@prisma/client";

const schema = yup.object({
  title: yup.string().required(),
  value: yup.number().min(0.01).required(),
  type: yup.string().oneOf(["income", "expense"]).required(),
  bankId: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

const TransactionForm = ({
  closeDialog,
  banks,
}: {
  closeDialog: (value: boolean) => void;
  banks: Bank[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: session } = useSession();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      value: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!session) return;

    if (!date) return;

    setIsLoading(true);

    const transaction = await addTransaction({
      userId: session.user.id,
      bankId: data.bankId,
      type: data.type,
      name: data.title,
      value: data.value / 100,
      date,
    });

    if (transaction?.error) {
      setErrorMessage(transaction.error);
      setIsLoading(false);
      return;
    }

    reset();
    setIsLoading(false);
    closeDialog(false);
    toast(`Nova ${data.type === "income" ? "Receita" : "Despesa"} adicionada.`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMessage && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <Input
        placeholder="Titulo da transação"
        {...register("title")}
        className={cn(
          errors.title && "border-red-600 focus-visible:ring-red-600",
        )}
      />

      <Controller
        name="value"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputValue value={value} onChange={onChange} error={errors.value} />
        )}
      />

      <SelectType
        register={{ ...register("type") }}
        onChange={(value: string) =>
          setValue("type", value as "income" | "expense")
        }
      />

      <SelectBank
        register={{ ...register("bankId") }}
        onChange={(value: string) => setValue("bankId", value)}
        banks={banks}
      />

      <DatePicker date={date} setDate={setDate} />

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default TransactionForm;

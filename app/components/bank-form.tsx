"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import InputValue from "@/app/components/input-value";
import SubmitButton from "@/app/components/submit-button";

import banks from "@/banks.json";

import { addBank } from "@/app/actions/bank";

import { toast } from "sonner";

const schema = yup.object({
  value: yup.number().required(),
});

type FormData = yup.InferType<typeof schema>;

type BankType = {
  name: string;
  logo: string;
};

const BankForm = ({
  closeDialog,
}: {
  closeDialog: (value: boolean) => void;
}) => {
  const [selectedBank, setSelectedBank] = useState<BankType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: session } = useSession();

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
    if (!session) return;

    if (selectedBank === null) {
      setErrorMessage("Por favor, selecione um banco.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const bank = await addBank({
      userId: session.user.id,
      name: selectedBank.name,
      logo: selectedBank.logo,
      initial_value: data.value / 100,
    });

    if (bank?.error) {
      setErrorMessage(bank.error);
      setIsLoading(false);
      return;
    }

    reset();
    setIsLoading(false);
    closeDialog(false);
    toast("Novo banco adicionado.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {errorMessage && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <Select
        onValueChange={(value) => {
          setSelectedBank(banks.find((bank) => bank.name === value) || null);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecione o banco" />
        </SelectTrigger>
        <SelectContent>
          {banks.map((bank) => (
            <SelectItem key={bank.name} value={bank.name}>
              <div className="flex items-center gap-2.5">
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  height={246}
                  width={246}
                  className="h-3 w-3 rounded"
                />
                {bank.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Controller
        name="value"
        control={control}
        render={({ field: { value, onChange } }) => (
          <InputValue value={value} onChange={onChange} error={errors.value} />
        )}
      />

      <SubmitButton isLoading={isLoading} />
    </form>
  );
};

export default BankForm;

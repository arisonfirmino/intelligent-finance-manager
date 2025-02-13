"use client";

import { useState } from "react";

import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

import { PiggyBankIcon } from "lucide-react";

import { createSavings } from "@/app/actions/savings";

const CreateSavings = ({ userId }: { userId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSavings = async () => {
    setIsLoading(true);

    await createSavings({ userId });

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <p className="text-3xl font-bold">
        Crie sua poupança e comece a economizar hoje.
      </p>

      <div
        className="flex h-28 w-full items-center justify-center bg-cover bg-top"
        style={{
          backgroundImage: "url('/savings-banner.png')",
        }}
      >
        <Button
          disabled={isLoading}
          onClick={handleCreateSavings}
          className={cn("hover:bg-secondary hover:text-foreground")}
        >
          <PiggyBankIcon />
          {isLoading ? "Criando poupança" : "Criar poupança"}
        </Button>
      </div>

      <p className="text-sm">
        Registrar suas transações e acompanhar seus gastos é o primeiro passo
        para um futuro mais seguro. Comece agora e veja como a disciplina
        financeira pode transformar sua vida.
      </p>
    </div>
  );
};

export default CreateSavings;

import { cn } from "@/app/lib/utils";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/app/components/ui/tabs";
import TabsHeader from "@/app/components/header/menu/tabs-header";
import TransactionForm from "@/app/components/transaction-form";
import BankForm from "@/app/components/bank-form";

import { Bank } from "@prisma/client";

interface DialogTabsProps {
  banks: Bank[];
  closeDialog: () => void;
}

const DialogTabs = ({ banks, closeDialog }: DialogTabsProps) => {
  return (
    <Tabs defaultValue="transaction">
      <TabsList>
        <TabsTrigger value="transaction">Transação</TabsTrigger>
        <TabsTrigger value="bank">Banco</TabsTrigger>
      </TabsList>

      <TabsContent value="transaction" className={cn("space-y-5")}>
        <TabsHeader
          banks={banks.length}
          title="Nova Transação"
          description="Preencha os campos abaixo com as informações da transação para
              adicioná-la ao seu controle financeiro."
        />

        {banks.length > 0 ? (
          <TransactionForm banks={banks} closeDialog={closeDialog} />
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            Antes de adicionar uma nova transação, é necessário cadastrar pelo
            menos um banco.
          </p>
        )}
      </TabsContent>

      <TabsContent value="bank" className={cn("space-y-5")}>
        <TabsHeader
          banks={banks.length}
          title="Novo Banco"
          description="Selecione o banco e informe o valor inicial para adicioná-lo ao seu
            controle financeiro."
        />
        <BankForm closeDialog={closeDialog} />
      </TabsContent>
    </Tabs>
  );
};

export default DialogTabs;

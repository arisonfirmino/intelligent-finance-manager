import Image from "next/image";

import { UseFormRegisterReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Bank } from "@prisma/client";

interface SelectBankProps {
  register: UseFormRegisterReturn;
  onChange: (value: string) => void;
  banks: Bank[];
}

const SelectBank = ({ register, onChange, banks }: SelectBankProps) => {
  return (
    <Select {...register} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o banco" />
      </SelectTrigger>
      <SelectContent>
        {banks.map((bank) => (
          <SelectItem key={bank.id} value={bank.id}>
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
  );
};

export default SelectBank;

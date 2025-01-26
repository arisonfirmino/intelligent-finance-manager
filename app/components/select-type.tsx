import { UseFormRegisterReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";

interface SelectTypeProps {
  register: UseFormRegisterReturn;
  onChange: (value: string) => void;
}

const SelectType = ({ register, onChange }: SelectTypeProps) => {
  return (
    <Select {...register} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione o tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="expense">Despesa</SelectItem>
        <SelectItem value="income">Receita</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectType;

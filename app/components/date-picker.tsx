import { cn } from "@/app/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { Button } from "@/app/components/ui/button";

import { CalendarIcon } from "lucide-react";

import { ptBR } from "date-fns/locale";
import { formatDate } from "@/app/helpers/formatDate";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          className={cn(
            "w-full border border-input bg-muted",
            !date && "border-red-600 text-red-600",
          )}
        >
          <CalendarIcon />
          {date ? (
            formatDate(date)
          ) : (
            <span className="uppercase">Selecione uma data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ptBR}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;

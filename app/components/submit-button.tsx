import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

const SubmitButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full border-none bg-primary text-white hover:bg-secondary hover:text-muted-foreground",
      )}
    >
      {isLoading ? "Adicionando" : "Adicionar"}
    </Button>
  );
};

export default SubmitButton;

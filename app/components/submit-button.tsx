import { cn } from "@/app/lib/utils";

import { Button } from "@/app/components/ui/button";

const SubmitButton = ({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn(
        "w-full border-none bg-primary text-white hover:bg-secondary hover:text-muted-foreground",
      )}
    >
      {isLoading ? "Carregando" : children}
    </Button>
  );
};

export default SubmitButton;

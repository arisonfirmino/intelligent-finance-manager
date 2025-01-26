"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";

import Link from "next/link";

interface NavButtonProps {
  page: { page: string; icon: React.ReactNode; href: string };
}

const NavButton = ({ page }: NavButtonProps) => {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="nav"
            asChild
            className={cn(
              pathname === page.href && "border bg-secondary text-primary",
            )}
          >
            <Link href={page.href}>{page.icon}</Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{page.page}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NavButton;

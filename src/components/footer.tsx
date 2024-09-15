import { Github } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="flex h-14 w-full flex-none items-center justify-center gap-4 border-t border-slate-300 py-2 dark:border-slate-600">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Link href="https://github.com/mva919/remind-me">
                <Github />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>My GitHub</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <p>Created by Marcos Villanueva Abreu</p>
    </footer>
  );
};

export default Footer;

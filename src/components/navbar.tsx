import { useClerk } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import ThemeToggle from "~/components/theme-toggle";

const Navbar = () => {
  const { signOut } = useClerk();

  return (
    <nav className="flex h-14 w-full flex-none items-center justify-between border-b border-slate-300 px-1 dark:border-slate-600 sm:px-4">
      <h1 className="font-semibold dark:text-slate-100">remind me.</h1>
      <div className="flex items-center justify-between gap-6">
        <ThemeToggle />
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => void signOut()}>
                <LogOut height={18} width={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;

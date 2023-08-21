import { useClerk } from "@clerk/nextjs";
import ThemeToggle from "./themetoggle";
import { LogOut } from "lucide-react";
import Button from "./button";

const Navbar = () => {
  const { signOut } = useClerk();

  return (
    <nav className="flex h-14 w-full flex-none items-center justify-between border-b border-slate-300 px-4 dark:border-slate-600">
      <h1 className="font-semibold dark:text-slate-100">Remind me.</h1>
      <div className="flex items-center justify-between gap-6">
        <ThemeToggle />
        <Button variant="primary" onClick={() => void signOut()}>
          <LogOut height={18} width={18} />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;

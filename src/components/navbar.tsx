import { useClerk } from "@clerk/nextjs";
import ThemeToggle from "./themetoggle";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { signOut } = useClerk();

  return (
    <nav className="flex h-14 w-full flex-none items-center justify-between border-b border-slate-300 px-4 dark:border-slate-600">
      <h1 className="font-semibold dark:text-slate-100">Remind me.</h1>
      <div className="flex items-center justify-between gap-6">
        <ThemeToggle />
        <button
          className="rounded bg-red-600 p-2 text-white transition-all duration-100 hover:scale-95 hover:bg-red-700 active:ring active:ring-black dark:active:ring-slate-100"
          onClick={() => void signOut()}
        >
          <LogOut height={18} width={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

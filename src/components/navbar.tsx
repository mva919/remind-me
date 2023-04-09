import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "./themetoggle";

const Navbar = () => {
  return (
    <nav className="flex h-14 w-full items-center justify-between border-b border-slate-200 px-4 dark:border-slate-600 ">
      <h1 className="font-semibold dark:text-slate-100">Remind me</h1>
      <div className="flex items-center justify-between gap-12">
        <ThemeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
export default Navbar;

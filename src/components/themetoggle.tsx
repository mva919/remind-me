import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded p-2 hover:bg-slate-200 active:ring-2 active:ring-black dark:text-slate-100 dark:hover:bg-slate-800 dark:active:ring-slate-100"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Sun className="h-5 w-5 " />
    </button>
  );
};

export default ThemeToggle;

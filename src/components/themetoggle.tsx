import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="rounded p-2  hover:bg-slate-200 active:border active:border-black dark:text-slate-100 dark:hover:bg-slate-800 dark:active:border-slate-100"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Sun className="h-5 w-5 " />
    </button>
  );
};

export default ThemeToggle;

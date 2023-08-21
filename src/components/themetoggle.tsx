import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Button from "./button";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <Sun className="h-5 w-5 " />
    </Button>
  );
};

export default ThemeToggle;

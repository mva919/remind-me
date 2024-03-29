import { Github } from "lucide-react";
import Link from "next/link";
import Button from "./button";

const Footer = () => {
  return (
    <footer className="flex h-14 w-full flex-none items-center justify-center gap-4 border-t border-slate-300 py-2 dark:border-slate-600">
      <Button>
        <Link href="https://github.com/mva919/remind-me">
          <Github />
        </Link>
      </Button>
      <p>Created by Marcos Villanueva Abreu</p>
    </footer>
  );
};

export default Footer;

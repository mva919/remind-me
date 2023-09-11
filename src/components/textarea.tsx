import { cva } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

const TextAreaVariants = cva(
  "rounded px-2 py-3 border-none transition-all focus:outline-none focus:ring-2 active:ring-2 bg-slate-200 dark:bg-slate-800 dark:ring-slate-50 ring-black"
);

interface ITextAreaProps extends HTMLAttributes<HTMLTextAreaElement> {
  value?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ id, className, value, ...props }, ref) => {
    return (
      <textarea
        className={cn(className, TextAreaVariants())}
        name={id}
        {...{ ref, id, value }}
        {...props}
      ></textarea>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;

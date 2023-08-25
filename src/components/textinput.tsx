import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "~/utils/cn";

const textInputVariants = cva(
  "rounded px-2 py-3 border-none transition-all focus:outline-none focus:ring-2 active:ring-2 bg-slate-200 dark:bg-slate-800 dark:ring-slate-50 ring-black"
);

interface ITextInputProps
  extends HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof textInputVariants> {
  value?: string;
  disabled?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, ITextInputProps>(
  ({ className, id, disabled, value, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={cn(className, textInputVariants())}
        id={id}
        name={id}
        {...{ disabled, value }}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;

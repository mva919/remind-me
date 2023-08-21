import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "~/utils/cn";

const buttonVariants = cva("rounded p-2 active:ring-2 transition-all", {
  variants: {
    variant: {
      default:
        "active:ring-black hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800 dark:active:ring-slate-100",
      primary:
        "bg-red-600 p-2 text-white duration-100 hover:scale-95 hover:bg-red-700 active:ring-black dark:active:ring-slate-100",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface IButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, children, variant, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;

import { cva, type VariantProps } from "class-variance-authority";
import React, { forwardRef, type HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "rounded p-2 active:ring-2 transition-all focus:outline-none focus-visible:ring-2 active:ring-2 dark:ring-slate-50 ring-black",
  {
    variants: {
      variant: {
        default:
          "hover:bg-slate-200 dark:text-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:ring-0 disabled:hover:scale-100 disabled:hover:text-white disabled:hover:dark:bg-slate-900 disabled:hover:bg-slate-200 disabled:hover:bg-slate-50 disabled:hover:text-black disabled:hover:dark:text-slate-100",
        primary:
          "bg-red-600 p-2 text-white duration-100 hover:scale-95 hover:bg-red-700 active:ring-black dark:active:ring-slate-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:ring-0 disabled:hover:scale-100 disabled:hover:bg-red-600 disabled:hover:text-white disabled:hover:bg-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface IButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, children, variant, isLoading, isDisabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        disabled={isLoading || isDisabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;

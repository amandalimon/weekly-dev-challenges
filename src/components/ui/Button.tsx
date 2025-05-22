import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg whitespace-nowrap transition ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

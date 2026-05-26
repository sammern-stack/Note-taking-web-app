import type React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "warning" | "cancel";
  className?: string;
}

export const Button = ({
  children,
  variant,
  className,
  ...props
}: ButtonProps) => (
  <button
    className={`button button--${variant ?? "primary"} ${className}`}
    {...props}
  >
    {children}
  </button>
);

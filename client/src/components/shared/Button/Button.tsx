import type React from "react";
import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "warning" | "cancel";
}

export const Button = ({ children, variant, ...props }: ButtonProps) => (
  <button className={`button button--${variant ?? "primary"}`} {...props}>
    {children}
  </button>
);

import type React from "react";
import "./Title.scss";

interface TitleProps {
  children: React.ReactNode;
  size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

export const Title = ({ children, size, className }: TitleProps) => (
  <div className={`title-${size} ${className}`}>{children}</div>
);

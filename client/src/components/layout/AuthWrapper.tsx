import type React from "react";
import { SiteLogo } from "../shared";

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => (
  <div className="auth">
    <div className="auth__content">
      <SiteLogo wrapper="auth__icon-wrapper" />

      {children}
    </div>
  </div>
);

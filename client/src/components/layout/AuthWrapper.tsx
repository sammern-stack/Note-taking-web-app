//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type React from "react";
import { SiteLogo } from "../shared";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface AuthWrapperProps {
  children: React.ReactNode;
}

//—————————————————————————————————————————————————————————————————
// Components
//—————————————————————————————————————————————————————————————————

export const AuthWrapper = ({ children }: AuthWrapperProps) => (
  <div className="auth">
    <div className="auth__content">
      <SiteLogo wrapper="auth__icon-wrapper" />

      {children}
    </div>
  </div>
);

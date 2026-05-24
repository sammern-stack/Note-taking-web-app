//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { ErrorMessage, useFormikContext } from "formik";
import InfoIcon from "../../../assets/images/icon-info.svg?react";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface FormErrorProps {
  name: string;
}

//—————————————————————————————————————————————————————————————————
// Component
//—————————————————————————————————————————————————————————————————

export const FormError = ({ name }: FormErrorProps) => {
  const { errors, touched } = useFormikContext<Record<string, unknown>>();
  if (!touched[name] || !errors[name]) return null;

  return (
    <div className="form__error">
      <InfoIcon />
      <ErrorMessage name={name} component="div" className="form__error-text" />
    </div>
  );
};

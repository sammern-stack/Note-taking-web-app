import { ErrorMessage, useFormikContext } from "formik";
import InfoIcon from "../../../assets/images/icon-info.svg?react";

interface FormErrorProps {
  name: string;
}

export const FormError = ({ name }: FormErrorProps) => {
  const { errors, touched } = useFormikContext<Record<string, unknown>>();
  if (!touched[name] || !errors[name]) return null;

  return (
    <div className="form__error">
      <InfoIcon />
      <ErrorMessage name={name} component="div" className="form__error-text" />
    </div>
  )
};

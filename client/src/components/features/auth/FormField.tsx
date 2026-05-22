import { Field, ErrorMessage } from "formik";
import "./styles.scss";

interface FormFieldProps {
  fieldName: string;
  errorName: string;
  type: string;
  label: string;
}

export const FormField = ({
  fieldName,
  errorName,
  type,
  label,
}: FormFieldProps) => (
  <div className="auth__form-field">
    <label htmlFor={fieldName}>{label}</label>
    <Field id={fieldName} name={fieldName} type={type} />
    <ErrorMessage
      name={errorName}
      component="div"
      className="auth__form-error"
    />
  </div>
);

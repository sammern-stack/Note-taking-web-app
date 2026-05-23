import { Field, ErrorMessage } from "formik";
import "./styles.scss";

interface FormFieldProps {
  name: string;
  error: string;
  type: string;
  label: string;
}

export const FormField = ({ name, error, type, label }: FormFieldProps) => (
  <div className="form__field">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} type={type} className="form__input" />
    <ErrorMessage name={error} component="div" className="form__error" />
  </div>
);

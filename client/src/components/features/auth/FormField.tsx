import type React from "react";
import { Field } from "formik";
import { FormError } from "./FormError";
import { ShowPassword } from "./ShowPassword";
import "./styles.scss";

interface FormFieldProps {
  children: React.ReactNode;
  name: string;
  error: string;
  type: "text" | "email" | "password";
}

export const FormField = ({ name, error, type, children }: FormFieldProps) => (
  <div className="form__field">
    <label htmlFor={name} className="form__label">
      {children}
    </label>

    <div className="form__input-wrapper">
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={type === "email" && "email@example.com"}
        className="form__input"
      />
      {type === "password" && <ShowPassword />}
    </div>

    <FormError name={error} />
  </div>
);

import { Formik, Form, type FormikHelpers } from "formik";
import { ObjectSchema } from "yup";
import "./styles.scss";

type FormikWrapperProps<T extends object> = {
  initialValues: T;
  validationSchema: ObjectSchema<any>;
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
};

interface FormProps<T extends object> {
  formik: FormikWrapperProps<T>;
  submitLabel: string;
  submittingLabel: string;
  children: React.ReactNode;
}

export const AuthForm = <T extends object>({
  formik,
  submitLabel,
  submittingLabel,
  children,
}: FormProps<T>) => {
  const { initialValues, validationSchema, onSubmit } = formik;

  return (
    <Formik {...{ initialValues, validationSchema, onSubmit }}>
      {({ isSubmitting }) => (
        <Form className="auth__form">
          {children}
          <button
            type="submit"
            disabled={isSubmitting}
            className="auth__form-submit"
          >
            {isSubmitting ? submittingLabel : submitLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
};

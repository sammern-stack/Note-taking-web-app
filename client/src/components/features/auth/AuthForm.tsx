import { Formik, Form, type FormikHelpers } from "formik";
import { ObjectSchema } from "yup";
import { Button } from "../../shared";
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
}: FormProps<T>) => (
  <Formik {...formik}>
    {({ isSubmitting }) => (
      <Form className="auth__form">
        {children}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </Form>
    )}
  </Formik>
);

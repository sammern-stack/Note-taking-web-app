import { useForgotPassword } from "../../hooks/auth";
import { AuthForm, FormField } from "../../components/features/auth";
import { Title } from "../../components/shared";
import { AuthWrapper } from "../../components/layout";
import "./Auth.scss";

const RegisterPage = () => {
  const formik = useForgotPassword();

  return (
    <AuthWrapper>
      <div className="auth__header">
        <Title size="h1">Forgotten your password?</Title>
        <Title size="h2">
          Enter your email below, and we’ll send you a link to reset it.
        </Title>
      </div>

      <AuthForm
        formik={formik}
        submitLabel="Confirm"
        submittingLabel="Confirming..."
      >
        <FormField name="email" error="email" type="email">
          Email address
        </FormField>
      </AuthForm>
    </AuthWrapper>
  );
};

export default RegisterPage;

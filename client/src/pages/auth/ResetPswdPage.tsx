import { useResetPassword } from "../../hooks/auth";
import { AuthForm, FormField } from "../../components/features/auth";
import { Title } from "../../components/shared";
import { AuthWrapper } from "../../components/layout";
import "./Auth.scss";

const RegisterPage = () => {
  const formik = useResetPassword();

  return (
    <AuthWrapper>
      <div className="auth__header">
        <Title size="h1">Reset Your Password</Title>
        <Title size="h2">Choose a new password to secure your account.</Title>
      </div>

      <AuthForm
        formik={formik}
        submitLabel="Confirm"
        submittingLabel="Confirming..."
      >
        <FormField name="newPassword" error="password" type="password">
          New Password
        </FormField>

        <FormField name="confirmPassword" error="password" type="password">
          Confirm Password
        </FormField>
      </AuthForm>
    </AuthWrapper>
  );
};

export default RegisterPage;

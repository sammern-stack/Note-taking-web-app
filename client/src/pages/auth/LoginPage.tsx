import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import { AuthForm, FormField } from "../../components/features/auth";
import { SiteLogo, Title } from "../../components/shared";
import "./Auth.scss";

const LoginPage = () => {
  const formik = useLogin();

  return (
    <div className="auth">
      <div className="auth__content">
        <SiteLogo wrapper="auth__icon-wrapper" />

        <div className="auth__header">
          <Title size="h1">Welcome to Note</Title>
          <Title size="h2">Please log in to continue</Title>
        </div>

        <AuthForm
          formik={formik}
          submitLabel="Login"
          submittingLabel="Logging in..."
        >
          <FormField name="email" error="email" type="email">
            Email address
          </FormField>

          <FormField name="password" error="password" type="password">
            Password
            <span>Forgot</span>
          </FormField>
        </AuthForm>

        <div className="auth__footer">
          <Title size="h2">
            No account yet? <Link to="/signup">Sign up</Link>
          </Title>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

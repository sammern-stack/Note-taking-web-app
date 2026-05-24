import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import { AuthForm, FormField } from "../../components/features/auth";
import { Button, Title } from "../../components/shared";
import { AuthWrapper } from "../../components/layout";
import GoogleIcon from "../../assets/images/icon-google.svg?react";
import "./Auth.scss";

const LoginPage = () => {
  const formik = useLogin();

  return (
    <AuthWrapper>
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

      <div className="auth__google">
        <Title size="h2">Or log in with:</Title>
        <Button variant="secondary" onClick={() => alert("Coming soon...")}>
          <GoogleIcon />
          <span>Google</span>
        </Button>
      </div>

      <hr className="auth__divider" />

      <div className="auth__footer">
        <Title size="h2">
          No account yet?{" "}
          <Link to="/signup" className="auth__link">
            Sign up
          </Link>
        </Title>
      </div>
    </AuthWrapper>
  );
};

export default LoginPage;

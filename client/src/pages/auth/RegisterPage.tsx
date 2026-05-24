import { Link } from "react-router-dom";
import { useRegister } from "../../hooks/auth";
import { AuthForm, FormField } from "../../components/features/auth";
import { Button, Title } from "../../components/shared";
import { AuthWrapper } from "../../components/layout";
import GoogleIcon from "../../assets/images/icon-google.svg?react";
import "./Auth.scss";

const RegisterPage = () => {
  const formik = useRegister();

  return (
    <AuthWrapper>
      <div className="auth__header">
        <Title size="h1">Create Your Account</Title>
        <Title size="h2">
          Sign up to start organizing your notes and boost your productivity.
        </Title>
      </div>

      <AuthForm
        formik={formik}
        submitLabel="Signup"
        submittingLabel="Signing up..."
      >
        <FormField name="username" error="username" type="text">
          Full Name
        </FormField>

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
          Already have an account?{" "}
          <Link to="/login" className="auth__link">
            Log in
          </Link>
        </Title>
      </div>
    </AuthWrapper>
  );
};

export default RegisterPage;

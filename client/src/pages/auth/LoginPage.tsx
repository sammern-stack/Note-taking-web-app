import { useLogin } from "../../hooks/auth/useLogin";
import {
  FormFooter,
  AuthForm,
  FormField,
} from "../../components/features/auth";
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
          <FormField
            name="email"
            error="email"
            type="email"
            label="Email address"
          />

          <FormField
            name="password"
            error="password"
            type="password"
            label="Password"
          />
        </AuthForm>

        <FormFooter label="No account yet?" nav="Sign up" link="/signup" />
      </div>
    </div>
  );
};

export default LoginPage;

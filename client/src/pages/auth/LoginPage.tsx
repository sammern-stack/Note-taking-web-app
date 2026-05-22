import {
  FormHeader,
  FormFooter,
  AuthForm,
  FormField,
} from "../../components/features/auth";
import { useLogin } from "../../hooks/auth/useLogin";
import "./Auth.scss";

const LoginPage = () => {
  const formik = useLogin();

  return (
    <div className="auth">
      <div className="auth__page-logo">
        <img src="../../assets/images/logo.svg" alt="site-logo" />

        <FormHeader
          title="Welcome to Note"
          subtitle="Please log in to continue"
        />

        <AuthForm
          formik={formik}
          submitLabel="Login"
          submittingLabel="Logging in..."
        >
          <FormField
            fieldName="email"
            errorName="email"
            type="email"
            label="Email address"
          />
          <FormField
            fieldName="password"
            errorName="password"
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

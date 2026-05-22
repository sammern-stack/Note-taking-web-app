import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/useAuthStore";
import type { LoginCredentials } from "../../api/authApi";
import type { FormikHelpers } from "formik";

export const useLogin = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? "/";

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (
    values: LoginCredentials,
    { setFieldError }: FormikHelpers<LoginCredentials>,
  ) => {
    const res = await login(values);

    if (!res.ok) {
      setFieldError("password", res.error);
      return;
    }

    navigate(from, { replace: true });
  };

  return { initialValues, validationSchema, onSubmit };
};

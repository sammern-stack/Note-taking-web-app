import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/useAuthStore";
import type { TOnSubmit } from "../../types";

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

  type TValues = typeof initialValues;
  const onSubmit: TOnSubmit<TValues> = async (values, { setFieldError }) => {
    const res = await login(values);
    if (!res.ok) return setFieldError("password", res.error);
    navigate(from, { replace: true });
  };

  return { initialValues, validationSchema, onSubmit };
};

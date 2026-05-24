import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuthStore } from "../../stores/useAuthStore";
import type { TOnSubmit } from "../../types";

export const useRegister = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  type TValues = typeof initialValues;
  const onSubmit: TOnSubmit<TValues> = async (values, { setFieldError }) => {
    const res = await register(values);
    if (!res.ok) return setFieldError("password", res.error);
    navigate("/");
  };

  return { initialValues, validationSchema, onSubmit };
};

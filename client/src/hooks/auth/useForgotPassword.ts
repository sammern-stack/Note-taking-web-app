import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type { TOnSubmit } from "../../types";
import { forgotUserPswd } from "../../api/authApi";

export const useForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email Required"),
  });

  type TValues = typeof initialValues;
  const onSubmit: TOnSubmit<TValues> = async (values, { setFieldError }) => {
    const res = await forgotUserPswd(values.email);

    if (!res.ok) return setFieldError("email", res.error);

    sessionStorage.setItem("resetToken", res.data);
    navigate("/reset-password");
  };

  return { initialValues, validationSchema, onSubmit };
};

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import type { TOnSubmit } from "../../types";
import { resetUserPswd } from "../../api/authApi";

export const useResetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Required"),
  });

  type TValues = typeof initialValues;
  const onSubmit: TOnSubmit<TValues> = async (values, { setFieldError }) => {
    const token = sessionStorage.getItem("resetToken");

    if (!token) {
      navigate("/forgot-password");
      return;
    }

    const res = await resetUserPswd({
      token,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });

    if (!res.ok) return setFieldError("confirmPassword", res.error);

    sessionStorage.removeItem("resetToken");
    navigate("/login");
  };

  return { initialValues, validationSchema, onSubmit };
};

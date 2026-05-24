import * as Yup from "yup";
import type { TOnSubmit } from "../../types";

export const useResetPassword = () => {
  const initialValues = {};
  const validationSchema = Yup.object({});

  type TValues = typeof initialValues;
  const onSubmit: TOnSubmit<TValues> = async (values, { setFieldError }) => {};

  return { initialValues, validationSchema, onSubmit };
};

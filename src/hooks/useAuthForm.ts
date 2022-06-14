import {
  useField,
  useForm,
  type FieldContext,
  type SubmissionHandler,
} from "vee-validate";
import { object, string } from "yup";

export const useAuthForm = (submitCallback: SubmissionHandler<any, void>) => {
  const authSchema = object({
    email: string().required().email(),
    password: string().required().min(8),
  });
  const { handleSubmit } = useForm({
    validationSchema: authSchema,
  });

  const getEmailField = () => {
    const {
      value: email,
      errorMessage: emailError,
      handleBlur: emailBlur,
      handleChange: emailChange,
    }: FieldContext<string> = useField("email");

    return { email, emailError, emailBlur, emailChange };
  };

  const getPassswordField = () => {
    const {
      value: password,
      errorMessage: passwordError,
      handleBlur: passwordBlur,
      handleChange: passwordChange,
    }: FieldContext<string> = useField("password");

    return { password, passwordError, passwordBlur, passwordChange };
  };

  const onSubmit = handleSubmit(submitCallback);

  return { onSubmit, getEmailField, getPassswordField };
};

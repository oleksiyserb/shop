import {
  useField,
  useForm,
  type FieldContext,
  type SubmissionHandler,
} from "vee-validate";
import { object, string } from "yup";

const useAuthForm = (
  submitCallback: SubmissionHandler<any, void>,
  method: string
) => {
  let authSchema;

  if (method === "signUp") {
    authSchema = object({
      name: string().required().min(2),
      surname: string().required().min(2),
      email: string().required().email(),
      password: string().required().min(8),
    });
  } else {
    authSchema = object({
      email: string().required().email(),
      password: string().required().min(8),
    });
  }

  const { handleSubmit } = useForm({
    validationSchema: authSchema,
  });

  const getNameField = () => {
    const {
      value: name,
      errorMessage: nameError,
      handleBlur: nameBlur,
      handleChange: nameChange,
    }: FieldContext<string> = useField("name");

    return { name, nameError, nameBlur, nameChange };
  };

  const getSurnameField = () => {
    const {
      value: surname,
      errorMessage: surnameError,
      handleBlur: surnameBlur,
      handleChange: surnameChange,
    }: FieldContext<string> = useField("surname");

    return { surname, surnameError, surnameBlur, surnameChange };
  };

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

  return {
    onSubmit,
    getNameField,
    getSurnameField,
    getEmailField,
    getPassswordField,
  };
};

export default useAuthForm;

const useCheckError = (error: string) => {
  let errorMessage;

  switch (error) {
    case "auth/email-already-in-use":
      errorMessage = "Email already in use.";
      break;
    case "auth/invalid-email":
      errorMessage = "Incorrect email, please enter again.";
      break;
    case "auth/operation-not-allowed":
      errorMessage = "Your account is disabled";
      break;
    case "auth/weak-password":
      errorMessage = "Weak password, please enter again.";
      break;
    case "auth/user-not-found":
      errorMessage = "No account with that email was found";
      break;
    case "auth/wrong-password":
      errorMessage = "Incorrect password";
      break;
    default:
      errorMessage = "Email or password was incorrect";
      break;
  }

  return errorMessage;
};

export default useCheckError;

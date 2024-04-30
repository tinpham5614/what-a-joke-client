type LoginData = {
  email: string;
  password: string;
};
const message = {
  emailRequired: "Email is required",
  passwordRequired: "Password is required",
  passwordError: "Password must be at least 6 characters long",
  emailInvalid: "Invalid email",
  success: "Login successful",
};

const validateLogin = (props: LoginData) => {
  if (!props.email) {
    return message.emailRequired;
  } else if (!props.password) {
    return message.passwordRequired;
  } else if (!props.email.includes("@")) {
    return message.emailInvalid;
  } else if (props.password.length < 6) {
    return message.passwordError;
  }
  return "";
};

export default validateLogin;

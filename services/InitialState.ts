const SignUpInitialState = {
  userName: "",
  email: "",
  password: "",
};

const VerifyInitialState = {
  otp: "",
  email: "",
};

const requestNewOTPInitialState = {
  email: "",
};

const LoginInitialState = {
  email: "",
  password: "",
};

const forgotPasswordInitialState = {
  email: "",
};

const resetPasswordInitialState = {
  password: "",
  confirmPassword: "",
  token: "",
};

export {
  SignUpInitialState,
  VerifyInitialState,
  requestNewOTPInitialState,
  LoginInitialState,
  forgotPasswordInitialState,
  resetPasswordInitialState,
};

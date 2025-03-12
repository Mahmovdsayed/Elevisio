export const SignUpInitialState = {
  userName: "",
  firstName: "",
  secondName: "",
  email: "",
  password: "",
  image: undefined as File | undefined,
};

export const VerifyInitialState = {
  otp: "",
  email: "",
};

export const requestNewOTPInitialState = {
  email: "",
};

export const LoginInitialState = {
  email: "",
  password: "",
};

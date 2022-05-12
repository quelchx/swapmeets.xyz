export type PasswordVerificationState = {
  status: boolean;
  message: string;
};

export const credentials = [
  "Has no whitespaces",
  "Contains at least one uppercase letter",
  "Contain at least one lowercase letter",
  "Contains at least one special symbol ex) !@#$%&",
  "Contains at least one digit",
  "Must be at least 8 characters long",
  "Password can not be P@ssw0rd",
];

export const passwordCheck = (password: string): Object => {
  const whitespace = /^(?=.*\s)/;
  const uppercaseChar = /^(?=.*[A-Z]).*$/;
  const lowercaseChar = /(?=.*[a-z])/;
  const digits = /(?=.*[0-9])/;
  const specialChars = /^(?=.*[~`!@#$%^&*()--+={}|\:;"'<>,.?/_₹]).*$/;
  const length = /^.{8,255}$/;

  let verification: PasswordVerificationState = {
    status: false,
    message: "Please enter a password",
  };

  if (whitespace.test(password)) {
    verification.message = "Password contains whitespace";
    return verification;
  }

  if (!uppercaseChar.test(password)) {
    verification.message =
      "Password must contain at least one uppercase character";
    return verification;
  }

  if (!lowercaseChar.test(password)) {
    verification.message = "Password must contain at least one lowercase char";
    return verification;
  }

  if (!digits.test(password)) {
    verification.message = "Password must contain at least one digit";
    return verification;
  }

  if (!specialChars.test(password)) {
    verification.message = "Password must contain one special character";
    return verification;
  }

  if (!length.test(password)) {
    verification.message = "Password must be at least 8 - 255 characters long";
    return verification;
  }

  verification.message = "Password meets requirements";
  verification.status = true;

  return verification;
};

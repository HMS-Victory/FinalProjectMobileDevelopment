export function validate({ email, confirmEmail, password, confirmPassword }, login) {
    email = email.trim();
    password = password.trim();
    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;
    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!login && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      return {
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confrimPassword: !passwordIsValid || !passwordsAreEqual,
        containsInvalid: true
      };
    }
    return { email, password };
  }
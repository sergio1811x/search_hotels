export const validateEmail = (onFocusInput, valueLogin) => {
  if (onFocusInput !== 'input1' && valueLogin.length > 0) {
    let re = /\S+@\S+\.\S+/;
    return re.test(valueLogin);
  }
};
export const validatePassword = (onFocusInput, valuePassword) => {
  if (onFocusInput !== 'input2' && valuePassword.length > 0) {
    let re = /^(?=.*[a-zA-Z0-9!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}/;
    let letter = re.test(valuePassword);
    return letter;
  }
};

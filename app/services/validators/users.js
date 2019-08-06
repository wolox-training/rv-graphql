/* eslint-disable curly */
// eslint-disable-next-line no-useless-escape
const regexValidEmail = /^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)@wolox.(com\.ar|cl)$/;
const regexAlphanumeric = /^[a-zA-Z0-9]*$/;

const isPasswordLenghtvalid = password => password.length > 7;
const isPasswordAlphanumeric = password => regexAlphanumeric.test(password);
const isEmailValid = email => regexValidEmail.test(email);

const validateEmailAndPassword = user => {
  const { email, password } = user;
  const errors = [];
  if (!isPasswordLenghtvalid(password)) errors.push('Password too short!');
  if (!isPasswordAlphanumeric(password)) errors.push('Password is not alphanumeric!');
  if (!isEmailValid(email)) errors.push('Email not valid!');
  return { errors };
};

module.exports = { validateEmailAndPassword };
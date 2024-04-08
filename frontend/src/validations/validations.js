export const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
export const validatePassword = (password) => {
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};
export const validateName = (name) => {
  const re = /^[a-zA-Z\s]*$/;
  return re.test(name);
};
export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};
export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9]*$/;
  return re.test(username);
};

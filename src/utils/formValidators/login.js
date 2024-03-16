const formValidator = (formData, setError) => {
  let newError = {};

  if (!formData.email) {
    newError.email = "Email address is required";
  }

  if (!formData.password) {
    newError.password = "password is required";
  }
  if (formData.password) {
    const length = formData.password.length;
    if (length < 8) {
      newError.password = "Password length should be greater than 8";
    }
  }

  setError(newError);

  return Object.keys(newError).length === 0;
};

export default formValidator;

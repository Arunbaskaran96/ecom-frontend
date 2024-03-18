export const addressValidator = (formData, setErrors) => {
  let error = {};

  if (!formData.name) {
    error.name = "Name is required";
  }
  if (!formData.email) {
    error.email = "Email is required";
  }
  if (!formData.phoneNo) {
    error.mobile = "Mobile is required";
  }
  if (!formData.doorNo) {
    error.door = "Door No is required";
  }
  if (!formData.city) {
    error.city = "City is required";
  }
  if (!formData.pinCode) {
    error.pincode = "Pincode is required";
  }
  if (!formData.street) {
    error.street = "Street is required";
  }

  setErrors(error);

  return Object.keys(error).length === 0;
};

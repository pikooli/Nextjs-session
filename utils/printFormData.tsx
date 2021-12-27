export const printFormData = (formData: FormData) => {
  if (!formData) {
    return;
  }
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
};
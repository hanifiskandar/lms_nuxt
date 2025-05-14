// utils/formData.js

export function prepareFormData(formData, fileFieldName) {
  const formDataToSend = new FormData();

  // Loop through the formData and append each field
  Object.keys(formData).forEach((key) => {
    if (key === fileFieldName && formData[key]) {
      // If the key matches the file field name, append the file
      formDataToSend.append(key, formData[key]);
    } else if (formData[key]) {
      // Otherwise, append the regular form fields
      formDataToSend.append(key, formData[key]);
    }
  });

  return formDataToSend;
}

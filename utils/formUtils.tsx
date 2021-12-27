import { Obj } from 'utils/types';

const getValues = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  let values: Obj = {}
  for (let [key, value] of formData.entries()) {
    values[key] = value;
  }
  return values;
}

export default {
  getValues
}
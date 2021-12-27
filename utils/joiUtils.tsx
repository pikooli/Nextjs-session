import { Obj } from 'utils/types';

const getErrors = (errors: Obj) => {
  const res: Obj = {}
  for (let i=0; i < errors.length; i++) {
    res[errors[i].path] = errors[i].message
  }
  return res;
}
export default {
  getErrors
}
import { printFormData } from "utils/printFormData";
import {Obj} from 'utils/types';

const customFetch = async (url: string, options: any) => {
  console.log(url, options);
  return await fetch(url, options).then((res) => {
    if (res.status === 401) {
      console.log("CODE ERROR 401");
    }
    return res;
  });
};

const createFormData = (body: any) => {
  const formData = new FormData();
  for (let k in body) {
    if (k === "files") {
      body[k].forEach((e, i) => {
        formData.append(`files`, e);
      });
      continue;
    }
    if (Array.isArray(body[k])) {
      body[k].forEach((e) => {
        formData.append(`${k}[]`, body[k]);
      });
      continue;
    }
    formData.append(k, body[k]);
  }
  return formData;
};

//
const urlWithParams = (url: string, params: Obj) => {
  if (!params) {
    return url;
  }
  let i = 0;
  for (let key in params) {
    url += i ? `&${key}=${params[key]}` : `?${key}=${params[key]}`;
    i++;
  }
  return url;
};

type requestParams = {
  url: string,
  method?: string,
  body?: Obj
  params?: Obj
}

//
const request = async ({url, method = 'GET', params, body = {}}: requestParams ) => {
  url = params ? urlWithParams(url, params): url;
  const sendFile = body?.files?.length;
  const formData = sendFile ? createFormData(body) : null;
  const headers = sendFile ? undefined : { "Content-Type": "application/json" };

  return await customFetch(url, {
    credentials: "include",
    method,
    headers: headers,
    body: sendFile ? formData : JSON.stringify(body),
  }).then((res) => {
    return res;
  });
};

export default request;

// //
// export const get = async ({url, params}: {url: string, params?: any}) => {
//   url = urlWithParams(url, params);
//   return await customFetch(url, {
//     method: "GET",
//     credentials: "include",
//   }).then((res) => {
//     return res;
//   });
// };

// // WORK ON POST SO IT THE SAME AS PUT
// export const put = async (url, body) => {
//   const sendFile = body?.files?.length;
//   const formData = sendFile ? createFormData(body) : null;
//   const headers = sendFile ? undefined : { "Content-Type": "application/json" };

//   return await customFetch(url, {
//     credentials: "include",
//     method: "PUT",
//     headers: headers,
//     body: sendFile ? formData : JSON.stringify(body),
//   }).then((res) => {
//     return res;
//   });
// };

//
// export const del = async ({url}: {url: string}) => {
//   return await customFetch(url, {
//     credentials: "include",
//     method: "DELETE",
//   }).then((res) => {
//     return res;
//   });
// };

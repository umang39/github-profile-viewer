import axios, { AxiosPromise, Method } from "axios";
import { loginInt } from "@interface/index";
const makeApiCall = (
  type: Method,
  url: string,
  data: loginInt
): AxiosPromise => {
  const res = axios({
    method: type,
    url: url,
    data: data,
    timeout: 5000,
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${data.password}`,
    },
  });
  return res;
};

export default makeApiCall;

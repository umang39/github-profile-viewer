import axios, { AxiosPromise, Method } from "axios";

const makeFetchUsersApiCall = (
  type: Method,
  url: string,
  user: string
): AxiosPromise => {
  const res = axios({
    method: type,
    url: url + `/users?q=${user}&page=1&per_page=20`,
    timeout: 5000,
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res;
};

export const makeSearchedUsersApiCall = (
  type: Method,
  url: string,
  user: string
): AxiosPromise => {
  const res = axios({
    method: type,
    url: url + `/${user}`,
    timeout: 5000,
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res;
};

export default makeFetchUsersApiCall;

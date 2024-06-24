import axios, { AxiosPromise, Method } from "axios";
import { Base64 } from "js-base64";
const makeisFollowingApi = (
  type: Method,
  url: string,
  user: string
): AxiosPromise => {
  const token = localStorage.getItem("token");
  const decodedToken = Base64.decode(token as string);
  try {
    const res = axios({
      method: type,
      url: url + `/${user}`,
      timeout: 5000,
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `Bearer ${decodedToken}`,
      },
    });
    return res;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default makeisFollowingApi;

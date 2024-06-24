import axios, { AxiosPromise, Method } from "axios";
import { Base64 } from "js-base64";
const makeisFollowApi = (
  type: Method,
  url: string,
  user: string
): AxiosPromise => {
  const token = localStorage.getItem("token");
  const decodedToken = Base64.decode(token as string);
  try {
    const res = axios({
      method: type,
      url: url + `/following/${user}`,
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

export default makeisFollowApi;

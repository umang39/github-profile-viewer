import axios, { AxiosPromise, Method } from "axios";
import { Base64 } from "js-base64";

const fetchSuggestedUsersApiCall = (
  type: Method,
  url: string,
  follower: number,
  page: number
): AxiosPromise => {
  const res = axios({
    method: type,
    url:
      url +
      `/users?q=followers:<=${Math.floor(follower) % 1000}&page=${Math.floor(
        page
      )}&per_page=10`,
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res;
};
export const followUserApiCall = (
  type: Method,
  url: string,
  user: string
): AxiosPromise => {
  const token = localStorage.getItem("token");
  const decodedToken = Base64.decode(token as string);
  const res = axios({
    method: type,
    url: url + `/user/following/${user}`,
    timeout: 5000,
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `Bearer ${decodedToken}`,
    },
  });

  return res;
};
export default fetchSuggestedUsersApiCall;

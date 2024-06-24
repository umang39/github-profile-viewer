import axios, { AxiosPromise, Method } from "axios";

const fetchFollowersApi = (type: Method, url: string): AxiosPromise => {
  const res = axios({
    method: type,
    url:
      url +
      `/users/${localStorage.getItem(
        "currentUser"
      )}/followers?page=1&per_page=1000`,
    timeout: 5000,
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });
  return res;
};

export default fetchFollowersApi;

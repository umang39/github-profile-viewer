import React from "react";
import { API_URLS, ACTION_CONST, STATUS_CODE } from "@constants/index";
import { loginInt, LoginAction, responseDataInterface } from "@interface/index";
import { makeApiCall } from "@services/makeApiCall";
import { Base64 } from "js-base64";

const { FETCH_DATA_SUCCESS, REMOVE_DATA, FETCH_DATA_ERROR } = ACTION_CONST;
export const fetchdataSuccess = (
  result: responseDataInterface
): LoginAction => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: result,
  };
};
export const fetchForbiddenError = (): LoginAction => {
  return {
    type: "FORBIDDEN",
    payload: null,
  };
};
export const fetchInternetConnectionError = (): LoginAction => {
  return {
    type: "INTERNET_CONNECTION_ERROR",
    payload: null,
  };
};
export const removeData = (): LoginAction => {
  return {
    type: REMOVE_DATA,
    payload: null,
  };
};

export const fetchdataError = (): LoginAction => {
  return {
    type: FETCH_DATA_ERROR,
    payload: null,
  };
};
export const fetchResponseDataError = (): LoginAction => {
  return {
    type: "RESPONSE_ERROR",
    payload: null,
  };
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchData = (data: loginInt) => {
  return (dispatch: React.Dispatch<LoginAction>): void => {
    makeApiCall("get", API_URLS.LOGIN, data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        if (res.status === STATUS_CODE.SUCCESS) {
          if (res.data.login === data.username) {
            res = {
              status: res.status,
              data: {
                login: res.data.login,
                followers: res.data.followers,
                following: res.data.following,
                bio: res.data.bio,
                location: res.data.location,
                email: res.data.email,
                name: res.data.name,
                avatar_url: res.data.avatar_url,
                html_url: res.data.html_url,
                blog: res.data.blog,
              },
            };
            dispatch(fetchdataSuccess(res));
            localStorage.setItem(
              "token",
              data.password ? Base64.encode(data.password) : ""
            );
            localStorage.setItem(
              "username",
              data.username ? data.username : ""
            );
          } else {
            dispatch(fetchdataError());
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          if (e.response.status === 401) {
            dispatch(fetchdataError());
          } else if (e.response.status === 403) {
            dispatch(fetchForbiddenError());
          } else {
            dispatch(fetchResponseDataError());
          }
        }
      });
  };
};

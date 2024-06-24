import { ACTION_CONST, SNACKBAR_TYPE, STATUS_CODE } from "@constants/index";
import { fetchReducerInterface, LoginAction } from "@interface/index";

export const intialState = {
  data: {},
};

export const fetchdataReducer = (
  state = intialState,
  action: LoginAction
): fetchReducerInterface => {
  const { FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, REMOVE_DATA } = ACTION_CONST;
  const { FORBIDDEN, NOT_FOUND, BAD_REQ } = STATUS_CODE;
  const { ERROR } = SNACKBAR_TYPE;
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        data: action.payload,
      };
    case FETCH_DATA_ERROR:
      return {
        data: {
          status: ERROR,
        },
      };
    case REMOVE_DATA:
      return {
        data: {},
      };
    case "INTERNET_CONNECTION_ERROR":
      return {
        data: {
          status: BAD_REQ,
        },
      };
    case "RESPONSE_ERROR":
      return {
        data: {
          status: NOT_FOUND,
        },
      };
    case "FORBIDDEN":
      return {
        data: {
          status: FORBIDDEN,
        },
      };
    default:
      return state;
  }
};

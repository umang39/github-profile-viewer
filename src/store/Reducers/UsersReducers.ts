import { ACTION_CONST } from "@constants/index";
import { responseDataInterface, usersInterface } from "@interface/index";

const intialState = {};
const usersReducers = (
  state = intialState,
  action: usersInterface
): responseDataInterface | undefined | null | typeof intialState => {
  const { FETCH_USERS } = ACTION_CONST;
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
};

export default usersReducers;

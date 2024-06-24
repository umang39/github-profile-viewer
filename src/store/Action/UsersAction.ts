import { ACTION_CONST } from "@constants/index";
import { responsefollowUsersInterface, usersInterface } from "@interface/index";

export const fetchUsers = (
  res: responsefollowUsersInterface
): usersInterface => {
  const { FETCH_USERS } = ACTION_CONST;
  return {
    type: FETCH_USERS,
    payload: res,
  };
};

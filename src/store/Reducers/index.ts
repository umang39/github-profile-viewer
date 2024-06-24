import { combineReducers } from "redux";
import { fetchdataReducer } from "./FetchdataReducers";
import usersReducers from "./UsersReducers";

const rootReducer = combineReducers({
  fetchdataReducer,
  usersReducers,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>;

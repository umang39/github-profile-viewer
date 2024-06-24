import makeApiCall from "./makeApiCall.service";
import fetchFollowersApi from "./makeFetchFollowers";
import makeFetchUsersApiCall from "./makefetchUsersApi";
import fetchSuggestedUsersApiCall, {
  followUserApiCall,
} from "./makesuggestionApi.service";

export {
  makeApiCall,
  makeFetchUsersApiCall,
  fetchFollowersApi,
  fetchSuggestedUsersApiCall,
  followUserApiCall,
};

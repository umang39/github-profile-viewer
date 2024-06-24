const API_URLS = {
  LOGIN: `${process.env.React_App_BASE_URL}/user`,
  FETCH_USERS: `${process.env.React_App_BASE_URL}/users`,
  SEARCH: `${process.env.React_App_BASE_URL}/search`,
  FOLLOWING: `${process.env.React_App_BASE_URL}/user/following`,
  SUGGESTION_FOLLOWING: `${process.env.React_App_BASE_URL}/following`,
};

export default API_URLS;

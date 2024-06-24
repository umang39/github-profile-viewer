export interface followUserInterface {
  id: number;
  html_url: string;
  login: string;
  avatar_url: string;
}

export interface responsefollowUsersInterface {
  status: number;
  data: {
    login: string;
    followers: number;
    following: number;
    avatar_url: string;
    blog: string;
    html_url: string;
    location: string;
    name: string;
  };
}

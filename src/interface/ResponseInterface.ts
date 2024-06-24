export interface LoginAction {
  type: string;
  payload: responseDataInterface | null | undefined;
}

export interface responseDataInterface {
  status?: number;
  data?: {
    login?: string;
    followers: number;
    following: number;
    bio: string | null;
    location: string | null;
    email: string | null;
    name: string | null;
    avatar_url: string | null;
    html_url: string;
    blog: string | null;
  };
}

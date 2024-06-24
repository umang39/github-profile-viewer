import React from "react";

export interface socialCardInterface {
  user: {
    login: string;
    followers: number;
    following: number;
    bio: string | null;
    location: string | null;
    email: string | null;
    name: string | null;
    avatar_url: string;
    html_url: string;
    blog: string | null;
  };
  isFollow?: boolean;
  followHandler?: (e: React.SyntheticEvent) => void;
  isFollowingUser?: (user: string) => void;
  followersHandler: (e: React.SyntheticEvent, login: string) => void;
}

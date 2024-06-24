import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { SocialCard } from "../..";
import renderer from "react-test-renderer";
import { socialCardInterface } from "@components/Socialcard/index";
afterEach(cleanup);
const authUser = {
  user: {
    avatar_url: "https://avatars.githubusercontent.com/u/92724856?v=4",
    login: "umang39",
    location: null,
    followers: 3,
    following: 0,
    bio: null,
    name: null,
    email: null,
    html_url: "https://github.com/umang39",
    blog: null,
  },
  followersHandler: jest.fn(),
};
const searchedUser = {
  user: {
    avatar_url: "https://avatars.githubusercontent.com/u/92724856?v=4",
    login: "xyz",
    location: "new york",
    followers: 3,
    following: 0,
    bio: null,
    name: null,
    email: "xyz@gmail.com",
    html_url: "https://github.com/umang39",
    blog: null,
  },
  followersHandler: jest.fn(),
};
const socialCardHandler = (props: socialCardInterface = authUser) => {
  return render(
    <SocialCard user={props.user} followersHandler={props.followersHandler} />
  );
};
it("social card  running without crashing", () => {
  socialCardHandler();
  const followers = screen.queryByText(3)?.innerHTML;
  const username = screen.queryByText("umang39")?.innerHTML;
  expect(username).toBe(authUser.user.login);
  expect(followers).toBe(authUser.user.followers.toString());
});

it("social card for searched users running without crashing", () => {
  socialCardHandler({
    user: searchedUser.user,
    followersHandler: searchedUser.followersHandler,
  });
  const username = screen.queryByText("xyz")?.innerHTML;
  expect(username).toBe(searchedUser.user.login);
});
it("mail is successfully sending", () => {
  socialCardHandler({
    user: searchedUser.user,
    followersHandler: searchedUser.followersHandler,
  });
  const email = screen.queryAllByRole("link")[1].getAttribute("href");
  expect(email).toBe(`mailto:${searchedUser.user.email.toString()}`);
});
it("follow button running without crashing", () => {
  const { container } = socialCardHandler({
    user: searchedUser.user,
    followersHandler: searchedUser.followersHandler,
  });
  fireEvent.click(container.querySelector("#xyz") as HTMLInputElement);
  expect(container.querySelector("#xyz")).toBeInTheDocument();
});
it("followers Button clicked succesfully", () => {
  const { container } = socialCardHandler({
    user: searchedUser.user,
    followersHandler: searchedUser.followersHandler,
  });
  fireEvent.click(container.querySelector("h4") as HTMLInputElement);
  expect(searchedUser.followersHandler).toBeCalled();
});
it("matches snapshot", () => {
  const tree = renderer
    .create(
      <SocialCard
        user={authUser.user}
        followersHandler={authUser.followersHandler}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

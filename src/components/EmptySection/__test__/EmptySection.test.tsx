import React from "react";
import { EmptySection } from "@components/index";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
afterEach(cleanup);
it("error component for bio section running successfully", () => {
  render(<EmptySection title="bio" />);
  const text = screen.queryByText(/bio/i)?.innerHTML;
  expect(text).toBe("Oops ! You have no bio");
});
it("error component for blog section running successfully", () => {
  render(<EmptySection title="blog" />);
  const text = screen.queryByText(/blog/i)?.innerHTML;
  expect(text).toBe("Oops ! You have no blog");
});
it("matches snapshot", () => {
  const tree = renderer.create(<EmptySection title="bio" />).toJSON();
  expect(tree).toMatchSnapshot();
});
it("matches snapshot", () => {
  const tree = renderer.create(<EmptySection title="blog" />).toJSON();
  expect(tree).toMatchSnapshot();
});

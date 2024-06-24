import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { ButtonInterface, ButtonComponent } from "@components/index";
afterEach(cleanup);
const handleClick = jest.fn();
const buttonProps: ButtonInterface = {
  btnHandler: handleClick,
  value: "submit",
  type: "button",
  id: "login-btn",
  isDisabled: false,
};
const buttonComponentHandler = (props: ButtonInterface = buttonProps) => {
  return render(
    <ButtonComponent
      btnHandler={props.btnHandler}
      value={props.value}
      type={props.type}
      id={props.id}
      isDisabled={props.isDisabled}
    />
  );
};
const snapButtonHandler = (props: ButtonInterface = buttonProps) => {
  return renderer
    .create(
      <ButtonComponent
        btnHandler={props.btnHandler}
        value={props.value}
        type={props.type}
        id={props.id}
        isDisabled={props.isDisabled}
      />
    )
    .toJSON();
};
it("button running without crashing", () => {
  const { container } = buttonComponentHandler();
  expect(container).toBeInTheDocument();
});
it("button is not disbabled", () => {
  buttonComponentHandler();
  const disbledFeature = (screen.queryByRole("button") as HTMLInputElement)
    .disabled;
  fireEvent.click(screen.queryByRole("button") as HTMLInputElement);
  expect(disbledFeature).toBe(false);
  expect(handleClick).toHaveBeenCalled();
});
it("follow button in social card running successfully", () => {
  buttonComponentHandler({
    type: "button",
    value: "Follow",
    id: "umang39",
    btnHandler: jest.fn(),
    isDisabled: false,
  });
  const disbledFeature = (screen.queryByRole("button") as HTMLInputElement)
    .disabled;
  fireEvent.click(screen.queryByRole("button") as HTMLInputElement);
  expect(disbledFeature).toBe(false);
  expect(handleClick).not.toHaveBeenCalled();
});
it("button is disbabled", () => {
  const { getByRole } = render(
    <ButtonComponent
      btnHandler={jest.fn()}
      value="submit"
      type="button"
      id="login-btn"
      isDisabled={true}
    />
  );
  fireEvent.click(screen.queryByRole("button") as HTMLInputElement);
  expect(getByRole("button")).toBeDisabled();
  expect(handleClick).not.toHaveBeenCalled();
});
it("matches snapshot with login button disabled", () => {
  const tree = snapButtonHandler({
    btnHandler: handleClick,
    value: "submit",
    type: "button",
    id: "login-btn",
    isDisabled: true,
  });
  expect(tree).toMatchSnapshot();
});
it("matches snapshot with login button not disabled", () => {
  const tree = snapButtonHandler();
  expect(tree).toMatchSnapshot();
});
it("matches snapshot with follow button", () => {
  const tree = snapButtonHandler({
    type: "button",
    value: "Follow",
    id: "umang39",
    btnHandler: jest.fn(),
    isDisabled: false,
  });
  expect(tree).toMatchSnapshot();
});

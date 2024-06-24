import React from "react";
import { cleanup, render } from "@testing-library/react";
import { NavBar } from "../..";
import { Provider } from "react-redux";
import store from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { ROUTES_PATH } from "../../../constants";
afterEach(cleanup);
const { HOME, SUGGESTION } = ROUTES_PATH;
it("navBar component running successfully", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[HOME, SUGGESTION]} initialIndex={1}>
        <NavBar />
      </MemoryRouter>
    </Provider>
  );
});

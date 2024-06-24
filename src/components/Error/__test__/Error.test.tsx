import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorComponent } from "@components/index";

it("error component running successfully", () => {
  render(<ErrorComponent />);
  const image = screen.queryByAltText(/notFound/i)?.className;
  expect(image).toBe("makeStyles-image-1");
});

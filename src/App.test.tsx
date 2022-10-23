import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders without crashing", () => {
  render(<App />);
  const linkElement = screen.getByText(/welcome to superwallet/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import React from "react";
import NetworkPicker from "./network-picker";

test("renders mainnet, rinkeby, and kovan as available options", () => {
  render(<NetworkPicker value="mainnet" />);

  const mainnet = screen.getByRole("option", { name: "mainnet" });
  expect(mainnet).toBeInTheDocument();

  const rinkeby = screen.getByRole("option", { name: "rinkeby" });
  expect(rinkeby).toBeInTheDocument();

  const kovan = screen.getByRole("option", { name: "kovan" });
  expect(kovan).toBeInTheDocument();

  expect(screen.getAllByRole("option").length).toBe(3);
});

test("selects given value as default value", () => {
  render(<NetworkPicker value="kovan" />);
  const element = screen.getByRole("option", { name: "kovan" });
  expect((element as HTMLOptionElement).selected).toBe(true);
});

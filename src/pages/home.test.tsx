import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./home";
import { Context as WalletsContext } from "../context";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { createTestingWrapper } from "../testing-utils";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper = ({ children }: WrapperProps) => (
  <Router>
    <WalletsContext.Provider
      value={{ loading: false, refetch: () => {}, wallets: [] }}
    >
      {children}
    </WalletsContext.Provider>
  </Router>
);

test("shows custom message when no wallets are in the device", () => {
  render(<Home />, {
    wrapper: createTestingWrapper({ wallets: [], loading: false }),
  });
  const message = screen.getByText(
    /it looks like you don't have any wallets yet/i
  );
  expect(message).toBeInTheDocument();
});

test("shows a button to create a new wallet", () => {
  render(<Home />, {
    wrapper: createTestingWrapper({ loading: false, wallets: [] }),
  });
  const button = screen.getByText(/create a new wallet/i);
  expect(button).toBeInTheDocument();
});

test("shows list of existing wallets", () => {
  render(<Home />, {
    wrapper: createTestingWrapper({
      loading: false,
      wallets: [
        {
          address: "0x6520e83cAD357185d102199a7937Cc390DA12EDE",
          encryptedJson: "",
        },
        {
          address: "0x99A9A4D77a9240C0F411179F78a381C4C07604bE",
          encryptedJson: "",
        },
      ],
    }),
  });
  const wallet1 = screen.getByText(
    /0x6520e83cAD357185d102199a7937Cc390DA12EDE/i
  );
  expect(wallet1).toBeInTheDocument();

  const wallet2 = screen.getByText(
    /0x99A9A4D77a9240C0F411179F78a381C4C07604bE/i
  );
  expect(wallet2).toBeInTheDocument();
});

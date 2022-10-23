import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import CreateWallet from "./create-wallet";
import { createTestingWrapper } from "../testing-utils";

test("Allows user to create a wallet with a password ", async () => {
  render(<CreateWallet />, { wrapper: createTestingWrapper() });
  const passwordInput = screen.getByLabelText("Password*");
  fireEvent.change(passwordInput, { target: { value: "password" } });

  act(() => {
    const createWalletButton = screen.getByRole("button", { name: /create/i });
    fireEvent.click(createWalletButton);
  });
});

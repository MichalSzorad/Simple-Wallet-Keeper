import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createTestingWrapper } from "../testing-utils";
import { WalletDetailPage } from "./index";

test("Allows user to see their address ", async () => {
  render(<WalletDetailPage />, { wrapper: createTestingWrapper() });
});

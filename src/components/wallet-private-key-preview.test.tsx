import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import WalletPrivateKeyPreview from "./wallet-private-key-preview";

jest.setTimeout(20000);

test("renders without crashing", () => {
  render(
    <WalletPrivateKeyPreview
      encryptedWalletJson={walletJsonWithATestPassword}
    />
  );
});

test("shows user error message when password is invalid", async () => {
  render(
    <WalletPrivateKeyPreview
      encryptedWalletJson={walletJsonWithATestPassword}
    />
  );

  const button = screen.getByText(/view private key/i);
  fireEvent.click(button);

  const passwordInput = screen.getByLabelText("Password*");
  fireEvent.change(passwordInput, { target: { value: "test" } });

  const confirmButton = screen.getByText(/confirm password/i);
  fireEvent.click(confirmButton);

  const errorMessage = await waitFor(
    () => screen.getByText(/invalid password/i),
    {
      timeout: 10000,
    }
  );

  expect(errorMessage).toBeInTheDocument();
});

test("shows user private key if password is correct", async () => {
  render(
    <WalletPrivateKeyPreview
      encryptedWalletJson={walletJsonWithATestPassword}
    />
  );

  const validPrivateKey =
    /0xe8034d4922191fcec454ae6c1264f81ade45f19729d2ab156d0d348ec218e18f/i;

  const button = screen.getByText(/view private key/i);
  fireEvent.click(button);

  const passwordInput = screen.getByLabelText("Password*");
  fireEvent.change(passwordInput, { target: { value: "password" } });

  const confirmButton = screen.getByText(/confirm password/i);
  fireEvent.click(confirmButton);

  await waitFor(
    () => expect(screen.getByText(validPrivateKey)).toBeInTheDocument(),
    { timeout: 100000 }
  );
});

const walletJsonWithATestPassword = `{"address":"6520e83cad357185d102199a7937cc390da12ede","id":"58b99ec1-3deb-4356-bd26-852ef7056f17","version":3,"crypto":{"cipher":"aes-128-ctr","cipherparams":{"iv":"609d526cbfd464fc1233b33bf888d091"},"ciphertext":"4fc0e6e4fc9c449b0814c176db6860c47904ad4749b298ab8d4541c126f52213","kdf":"scrypt","kdfparams":{"salt":"52bd5cd326127fe30424a988da3b69e3996914086751a74399a61274113f00a7","n":131072,"dklen":32,"p":1,"r":8},"mac":"4cb13b00f9f0db207d53f7ee80ed9c0f08063542c9e20653b6c26d1c3eadcf51"},"x-ethers":{"client":"ethers.js","gethFilename":"UTC--2022-10-22T15-15-17.0Z--6520e83cad357185d102199a7937cc390da12ede","mnemonicCounter":"33382d8bc36af0963988513abc4d34a4","mnemonicCiphertext":"44cf2bffa6ffc98d53532ca61fba4811","path":"m/44'/60'/0'/0/0","locale":"en","version":"0.1"}}`;

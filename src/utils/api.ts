import { Wallet } from "ethers";

const prefix = "wallet-";
export async function fetchAllWallets(): Promise<
  Array<{
    address: string;
    encryptedJson: string;
  }>
> {
  return Object.keys(localStorage)
    .filter((key) => key.startsWith(prefix))
    .map((identifier) => ({
      encryptedJson: localStorage[identifier],
      address: identifier.substring(prefix.length),
    }));
}

export async function saveNewWallet(
  wallet: Wallet,
  password: string
): Promise<void> {
  const jsonString = await wallet.encrypt(password);
  const key = `${prefix}${wallet.address}`;
  localStorage.setItem(key, jsonString);
}

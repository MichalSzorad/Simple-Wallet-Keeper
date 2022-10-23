import { ethers } from "ethers";
import { saveNewWallet } from "./api";
import { getAddressEmoji } from "./emojis";

export async function createRandomWalletAndStoreSecurely(
  password: string
): Promise<string> {
  const wallet = ethers.Wallet.createRandom();
  await saveNewWallet(wallet, password);
  return wallet.address;
}

export async function decryptWallet(jsonString: string, password: string) {
  return await ethers.Wallet.fromEncryptedJson(jsonString, password);
}

export async function fetchETHBalance(address: string, network: string) {
  const provider = ethers.getDefaultProvider(network);
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}

export function formatAddress(address: string) {
  const prefix = address.startsWith("0x") ? "" : "0x";
  return `${prefix}${address} ${getAddressEmoji(address)}`;
}
export function isValidETHAddress(address: string) {
  return ethers.utils.isAddress(address);
}

export async function getPrivateKey(
  encryptedWalletJson: string,
  password: string
) {
  const decrypted = await decryptWallet(encryptedWalletJson, password);
  return decrypted.privateKey;
}

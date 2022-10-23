import {
  Button,
  Container,
  Description,
  Title,
  WalletPickerItem,
} from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatAddress } from "../utils/wallet";
import { useWallets } from "../context";

export default function HomePage() {
  const { wallets } = useWallets();

  return (
    <Container>
      <Title>Welcome to SuperWallet</Title>
      {wallets.length > 0 && (
        <div>
          <Description>Choose one of your existing wallets</Description>
          {wallets.map((wallet) => (
            <WalletSeparator key={wallet.address}>
              <Link to={`/wallets/${wallet.address}`}>
                <WalletPickerItem>
                  <span>{formatAddress(wallet.address)}</span>
                </WalletPickerItem>
              </Link>
            </WalletSeparator>
          ))}
          <Description>or</Description>
        </div>
      )}
      {wallets.length === 0 && (
        <Description>It looks like you don't have any wallets yet</Description>
      )}
      <div>
        <Link to={`/wallets/create`}>
          <Button type="button">Create a new wallet</Button>
        </Link>
      </div>
    </Container>
  );
}

const WalletSeparator = styled.div`
  margin: 10px 0;
`;

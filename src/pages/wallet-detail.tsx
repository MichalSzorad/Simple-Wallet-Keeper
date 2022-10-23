import {
  Container,
  NetworkPicker,
  Title,
  WalletPrivateKeyPreview,
} from "../components";
import { useParams } from "react-router-dom";
import {
  fetchETHBalance,
  formatAddress,
  isValidETHAddress,
} from "../utils/wallet";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { useWallets } from "../context";

export default function WalletDetail() {
  const params = useParams<{ address: string }>();
  const address = String(params.address);
  const isValidAddress = useMemo(() => isValidETHAddress(address), [address]);
  const [network, setNetwork] = useState("mainnet");
  const { wallets, loading } = useWallets();
  const currentWalletData = useMemo(
    () => wallets.find((wallet) => wallet.address === address),
    [wallets, address]
  );
  const jsonOfCurrentWallet = currentWalletData?.encryptedJson;

  const balancesQuery = useQuery(
    ["balances", address, network],
    () => fetchETHBalance(address, network),
    { enabled: isValidAddress }
  );

  if (loading) {
    return <Container>Loading ...</Container>;
  }

  if (!jsonOfCurrentWallet) {
    return (
      <Container>
        <Title>This is not your address or this address is invalid</Title>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <Title>{formatAddress(address)}</Title>
        <NetworkWrapper>
          <NetworkPicker
            value={network}
            onChange={(network) => setNetwork(network)}
          />
        </NetworkWrapper>
        <div>
          {balancesQuery.isLoading && (
            <BalancesWrapper>
              <span>Loading your balance...</span>
            </BalancesWrapper>
          )}
          {!!balancesQuery.error && (
            <BalancesWrapper>
              <span>There was an error while fetching your balance</span>
            </BalancesWrapper>
          )}
          {balancesQuery.isSuccess && (
            <BalancesWrapper>
              <div>Your balance</div>
              <BalanceLabel>{`${balancesQuery.data} ETH`}</BalanceLabel>
            </BalancesWrapper>
          )}
        </div>
        <div>
          <WalletPrivateKeyPreview encryptedWalletJson={jsonOfCurrentWallet} />
        </div>
      </div>
    </Container>
  );
}

const NetworkWrapper = styled.div`
  max-width: 300px;
`;

const BalanceLabel = styled.div`
  font-size: 30px;
`;

const BalancesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
`;

import {
  Button,
  Container,
  ErrorMessage,
  PasswordInput,
  Title,
} from "../components";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { createRandomWalletAndStoreSecurely } from "../utils/wallet";
import { useWallets } from "../context";

export default function CreateWalletPage() {
  const [password, setPassword] = useState("");
  const [creatingWallet, setCreatingWallet] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const { refetch } = useWallets();

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setCreatingWallet(true);
    createRandomWalletAndStoreSecurely(password)
      .then((address) => navigate(`/wallets/${address}`))
      .catch((error) => setError(error))
      .finally(() => {
        refetch();
        setCreatingWallet(false);
      });
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Title>Create your password-protected wallet</Title>
        <Section>
          <label>
            <span>Password*</span>
            <PasswordInput
              type="password"
              required
              disabled={creatingWallet}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </Section>
        {error ? (
          <Section>
            <ErrorMessage>{error.message}</ErrorMessage>
          </Section>
        ) : null}
        <div>
          <Button type="submit" disabled={creatingWallet}>
            {creatingWallet ? "Creating your wallet" : "Create"}
          </Button>
        </div>
      </form>
    </Container>
  );
}

const Section = styled.div`
  margin: 20px 0;
`;

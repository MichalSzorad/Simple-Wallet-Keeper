import { Button, ErrorMessage, PasswordInput } from "./index";
import { memo, SyntheticEvent, useState } from "react";
import { getPrivateKey } from "../utils/wallet";
import styled from "styled-components";

export interface Props {
  encryptedWalletJson: string;
}

export default memo(WalletPrivateKeyPreview);

function WalletPrivateKeyPreview({ encryptedWalletJson }: Props) {
  const [showPrivateKeyForm, setShowPrivateKeyForm] = useState(false);
  const [password, setPassword] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [decrypting, setDecrypting] = useState(false);

  async function handlePasswordSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setDecrypting(true);
    setError(null);
    getPrivateKey(encryptedWalletJson, password)
      .then((privateKey) => setPrivateKey(privateKey))
      .catch((error) => setError(error))
      .finally(() => setDecrypting(false));
  }

  if (!showPrivateKeyForm) {
    return (
      <div>
        <Button type="button" onClick={() => setShowPrivateKeyForm(true)}>
          View private key
        </Button>
      </div>
    );
  }

  if (privateKey) {
    return (
      <div>
        <div>Your private key is</div>
        <pre>{privateKey}</pre>
        <Button
          type="button"
          onClick={() => {
            setPrivateKey("");
            setShowPrivateKeyForm(false);
            setPassword("");
          }}
        >
          Hide
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePasswordSubmit}>
      <Section>
        <label>
          <span>Password*</span>
          <PasswordInput
            type="password"
            required
            disabled={decrypting}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </Section>
      {error ? (
        <Section>
          <ErrorMessage>{error?.message}</ErrorMessage>
        </Section>
      ) : null}
      <Button type="submit" disabled={decrypting}>
        {decrypting ? "Decrypting..." : "Confirm password"}
      </Button>
    </form>
  );
}

const Section = styled.div`
  margin: 20px 0;
`;

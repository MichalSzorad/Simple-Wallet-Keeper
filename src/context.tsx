import { createContext, ReactElement, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllWallets } from "./utils/api";

export interface WalletsContextState {
  wallets: Array<{ address: string; encryptedJson: string }>;
  loading: boolean;
  refetch(): void;
}

export const Context = createContext<WalletsContextState | null>(null);

export function WalletsContextProvider({
  children,
}: {
  children: ReactElement;
}) {
  const query = useQuery(["wallets"], () => fetchAllWallets());
  const wallets = query.data ?? [];
  const refetch = query.refetch;
  const isLoading = query.isLoading || query.isRefetching;
  return (
    <Context.Provider
      value={{
        wallets,
        loading: isLoading,
        refetch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useWallets() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("useWallets needs to be within WalletsContextProvider");
  }
  return value;
}

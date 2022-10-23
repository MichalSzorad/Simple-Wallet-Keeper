import React, { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Context as WalletsContext, WalletsContextState } from "../context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function createTestingWrapper(props?: Partial<WalletsContextState>) {
  const { loading = false, wallets = [] } = props || {};
  const queryClient = new QueryClient();

  return ({ children }: { children: ReactElement }) => (
    <QueryClientProvider client={queryClient}>
      <Router>
        <WalletsContext.Provider
          value={{ loading, refetch: () => {}, wallets }}
        >
          {children}
        </WalletsContext.Provider>
      </Router>
    </QueryClientProvider>
  );
}

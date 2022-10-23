import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CreateWalletPage,
  HomePage,
  NotFoundPage,
  WalletDetailPage,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation, NavigationLink } from "./components";
import { WalletsContextProvider } from "./context";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletsContextProvider>
        <AppRoutes />
      </WalletsContextProvider>
    </QueryClientProvider>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Navigation>
        <NavigationLink to="/">Home</NavigationLink>
        <NavigationLink to="/wallets/create">Create Wallet</NavigationLink>
      </Navigation>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wallets/create" element={<CreateWalletPage />} />
          <Route path="/wallets/:address" element={<WalletDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

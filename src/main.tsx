<<<<<<< feat/frontend-zk-ipfs-network-wallet
import React from "react";
=======
>>>>>>> main
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
<<<<<<< feat/frontend-zk-ipfs-network-wallet
import { NetworkProvider } from "./context/NetworkContext";
=======
>>>>>>> main
import { WalletConnectButton } from "./components/WalletConnectButton";
import { NetworkSelector } from "./components/NetworkSelector";
import { MySwapsDashboard } from "./components/MySwapsDashboard";
import { MyListingsDashboard } from "./components/MyListingsDashboard";
<<<<<<< feat/frontend-zk-ipfs-network-wallet
=======
import { ListingsPage } from "./components/ListingsPage";
import { SwapPage } from "./components/SwapPage";
>>>>>>> main

function App() {
  const walletRoot = document.getElementById("wallet-root");
  const networkRoot = document.getElementById("network-root");
  const dashboardRoot = document.getElementById("dashboard-root");
  const listingsRoot = document.getElementById("listings-dashboard-root");

  return (
<<<<<<< feat/frontend-zk-ipfs-network-wallet
    <NetworkProvider>
      <WalletProvider>
        {networkRoot && createPortal(<NetworkSelector />, networkRoot)}
        {walletRoot && createPortal(<WalletConnectButton />, walletRoot)}
        {dashboardRoot && createPortal(<MySwapsDashboard />, dashboardRoot)}
        {listingsRoot && createPortal(<MyListingsDashboard />, listingsRoot)}
      </WalletProvider>
    </NetworkProvider>
=======
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/swap/:id" element={<SwapPage />} />
        </Routes>
      </BrowserRouter>

      {walletRoot && createPortal(<WalletConnectButton />, walletRoot)}
      {dashboardRoot && createPortal(<MySwapsDashboard />, dashboardRoot)}
      {listingsRoot && createPortal(<MyListingsDashboard />, listingsRoot)}
    </WalletProvider>
>>>>>>> main
  );
}

const appRoot = document.createElement("div");
appRoot.id = "react-app-root";
appRoot.style.display = "none";
document.body.appendChild(appRoot);

createRoot(appRoot).render(<App />);

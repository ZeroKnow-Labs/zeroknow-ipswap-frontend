import React, { useEffect, useState } from "react";
import { getSwapsByBuyer, getLedgerTimestamp } from "../lib/contractClient";
import { SwapCard } from "./SwapCard";
import "./SellerSwapList.css";

/**
 * SellerSwapList
 *
 * Fetches all swaps where the connected wallet is the seller,
 * filters to Pending only, and renders a ConfirmSwapForm for each.
 *
 * Props:
 *   wallet - connected wallet { address, signTransaction }
 */
export function SellerSwapList({ wallet }) {
  const [swaps, setSwaps] = useState([]);
  const [ledgerTimestamp, setLedgerTimestamp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSwaps = async () => {
    setError(null);
    try {
      const [fetchedSwaps, ts] = await Promise.all([
        getSwapsByBuyer(wallet.address),   // reuse index; filter by seller below
        getLedgerTimestamp(),
      ]);
      // Filter to swaps where this wallet is the seller and status is Pending
      const pending = fetchedSwaps.filter(
        (s) => s.seller === wallet.address && s.status === "Pending"
      );
      setSwaps(pending);
      setLedgerTimestamp(ts);
    } catch (err) {
      setError(err.message || "Failed to load swaps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet?.address) fetchSwaps();
  }, [wallet?.address]);

  if (loading) {
    return <p className="seller-swap-list__state">Loading swaps...</p>;
  }

  if (error) {
    return (
      <p className="seller-swap-list__state seller-swap-list__state--error" role="alert">
        {error}
      </p>
    );
  }

  if (swaps.length === 0) {
    return (
      <p className="seller-swap-list__state">No pending swaps to confirm.</p>
    );
  }

  return (
    <div className="seller-swap-list">
      {swaps.map((swap) => (
        <SwapCard
          key={swap.id}
          swap={swap}
          ledgerTimestamp={ledgerTimestamp}
          wallet={wallet}
          onSwapUpdated={fetchSwaps}
        />
      ))}
    </div>
  );
}

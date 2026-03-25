import React from "react";
import { CancelSwapButton } from "./CancelSwapButton";

/**
 * SwapCard — example usage of CancelSwapButton inside a swap list item.
 *
 * Props:
 *   swap            - full swap object from contract
 *   ledgerTimestamp - current ledger timestamp (poll from RPC or pass down)
 *   wallet          - connected wallet
 *   onSwapUpdated   - callback to refresh swap data after cancel
 */
export function SwapCard({ swap, ledgerTimestamp, wallet, onSwapUpdated }) {
  return (
    <div className="swap-card">
      <div className="swap-card__info">
        <span>Swap #{swap.id}</span>
        <span>Status: {swap.status}</span>
        <span>Amount: {swap.usdc_amount} USDC</span>
      </div>

      <CancelSwapButton
        swap={swap}
        ledgerTimestamp={ledgerTimestamp}
        wallet={wallet}
        onSuccess={onSwapUpdated}
      />
    </div>
  );
}

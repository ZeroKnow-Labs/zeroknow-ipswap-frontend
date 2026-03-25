import * as StellarSdk from "@stellar/stellar-sdk";

const RPC_URL =
  import.meta.env.VITE_STELLAR_RPC_URL ||
  "https://soroban-testnet.stellar.org";

const ATOMIC_SWAP_CONTRACT_ID = import.meta.env.VITE_CONTRACT_ATOMIC_SWAP;

/**
 * Calls cancel_swap(swap_id) on the atomic_swap contract.
 * @param {string} swapId - The swap ID (u64 as string or number)
 * @param {object} wallet  - Connected wallet with signTransaction method
 * @returns {Promise<void>}
 */
export async function cancelSwap(swapId, wallet) {
  if (!ATOMIC_SWAP_CONTRACT_ID) {
    throw new Error("VITE_CONTRACT_ATOMIC_SWAP is not configured.");
  }

  const server = new StellarSdk.SorobanRpc.Server(RPC_URL);
  const sourceAccount = await server.getAccount(wallet.address);

  const contract = new StellarSdk.Contract(ATOMIC_SWAP_CONTRACT_ID);

  const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase:
      import.meta.env.VITE_STELLAR_NETWORK === "mainnet"
        ? StellarSdk.Networks.PUBLIC
        : StellarSdk.Networks.TESTNET,
  })
    .addOperation(
      contract.call(
        "cancel_swap",
        StellarSdk.nativeToScVal(Number(swapId), { type: "u64" })
      )
    )
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);
  const signedXdr = await wallet.signTransaction(preparedTx.toXDR());
  const signedTx = StellarSdk.TransactionBuilder.fromXDR(
    signedXdr,
    import.meta.env.VITE_STELLAR_NETWORK === "mainnet"
      ? StellarSdk.Networks.PUBLIC
      : StellarSdk.Networks.TESTNET
  );

  const result = await server.sendTransaction(signedTx);

  if (result.status === "ERROR") {
    throw new Error(`Transaction failed: ${result.errorResult}`);
  }

  // Poll for confirmation
  let response = result;
  while (
    response.status === "PENDING" ||
    response.status === "NOT_FOUND"
  ) {
    await new Promise((r) => setTimeout(r, 1500));
    response = await server.getTransaction(result.hash);
  }

  if (response.status !== "SUCCESS") {
    throw new Error(`Transaction did not succeed: ${response.status}`);
  }
}

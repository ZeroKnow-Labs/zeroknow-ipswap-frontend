# ZeroKnow IPSwap — Frontend

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

React + TypeScript frontend for the Atomic IP Marketplace on Stellar.

**Organization:** [ZeroKnow-Labs](https://github.com/ZeroKnow-Labs)  
**Repository:** [zeroknow-ipswap-frontend](https://github.com/ZeroKnow-Labs/zeroknow-ipswap-frontend)

## Prerequisites

- Node.js v18+
- Deployed contract IDs (from the [contracts repo](https://github.com/ZeroKnow-Labs/zeroknow-ipswap-contracts))

## Related Repositories

- **[zeroknow-ipswap-contracts](https://github.com/ZeroKnow-Labs/zeroknow-ipswap-contracts)** — Soroban smart contracts
- **[zeroknow-ipswap-docs](https://github.com/ZeroKnow-Labs/zeroknow-ipswap-docs)** — Documentation

## Setup

```bash
cp .env.example .env   # fill in VITE_CONTRACT_* values
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_CONTRACT_ATOMIC_SWAP` | Deployed atomic_swap contract ID |
| `VITE_CONTRACT_IP_REGISTRY` | Deployed ip_registry contract ID |
| `VITE_CONTRACT_ZK_VERIFIER` | Deployed zk_verifier contract ID |
| `VITE_STELLAR_NETWORK` | `testnet` or `mainnet` |
| `VITE_STELLAR_RPC_URL` | Soroban RPC endpoint |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run tests |
| `npm run lint` | ESLint |

## License

Apache License 2.0 — see [LICENSE](./LICENSE).

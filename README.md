# Atomic IP Marketplace — Frontend

React + TypeScript frontend for the Atomic IP Marketplace on Stellar.

## Prerequisites

- Node.js v18+
- Deployed contract IDs (from the `contracts` repo)

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

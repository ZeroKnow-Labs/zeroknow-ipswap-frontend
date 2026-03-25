const RPC_URL = 'https://soroban-testnet.stellar.org/soroban/rpc';
const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';

const form = document.getElementById('keyForm');
const result = document.getElementById('result');
const statusSpan = document.getElementById('status');
const keySection = document.getElementById('keySection');
const keyTextarea = document.getElementById('key');
const copyBtn = document.getElementById('copyBtn');
const ipfsSection = document.getElementById('ipfsDecrypt');
const decryptBtn = document.getElementById('decryptBtn');
const decryptResult = document.getElementById('decryptResult');

// Helper: base64 to bytes
function base64ToBytes(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Stub IPFS decrypt demo (XOR cipher as placeholder)
function demoDecrypt(keyBytes, dataBytes) {
  const decrypted = new Uint8Array(dataBytes.length);
  for (let i = 0; i < dataBytes.length; i++) {
    decrypted[i] = dataBytes[i] ^ keyBytes[i % keyBytes.length];
  }
  return new TextDecoder().decode(decrypted);
}

async function fetchSwapData(contractId, swapId) {
  // Soroban RPC: simulateTransaction with invokeHostFunction for view calls
  // Build XDR for invoke { get_swap_status(u64) -> Option<u32> } and get_decryption_key(u64) -> Option<Bytes>
  // Simple: use string placeholders; in prod use @stellar/stellar-sdk ^12+ with xdr.fromXDR

  // For demo, assume status Completed if key present (combine calls)
  // RPC call for get_decryption_key (view function)

  const swapIdU64 = BigInt(swapId);

  // Build minimal ReadXdrRequest (simplified, actual needs full XDR serialization)
  // Note: Pure JS XDR hard; demo assumes SDK CDN or stub success for static demo
  // Load Stellar SDK
  const { Server } = await import('https://unpkg.com/@stellar/stellar-sdk@12.0.0/dist/stellar-sdk.min.js');
  const server = new Server(RPC_URL, { allowHttp: false });

  try {
    // Assume deployed contract has client AtomicSwapClient
    // Static demo: simulate key fetch
    const status = 'Completed'; // Stub; real: invokeView(get_swap_status)
    const keyBase64 = 'c3VwZXItc2VjcmV0LWtleQ=='; // base64 'super-secret-key'

    statusSpan.textContent = status;
    result.classList.remove('hidden');

    if (status === 'Completed') {
      keySection.classList.remove('hidden');
      ipfsSection.classList.remove('hidden');
      const keyBytes = base64ToBytes(keyBase64);
      keyTextarea.value = `Base64: ${keyBase64}\\nBytes: [${Array.from(keyBytes).join(', ')}]`;
    }
  } catch (error) {
    statusSpan.textContent = `Error: ${error.message}`;
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const contractId = document.getElementById('contractId').value;
  const swapId = parseInt(document.getElementById('swapId').value);
  await fetchSwapData(contractId, swapId);
});

copyBtn.addEventListener('click', () => {
  keyTextarea.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => copyBtn.textContent = 'Copy Key', 2000);
});

decryptBtn.addEventListener('click', () => {
  const cid = document.getElementById('cid').value;
  if (!cid) return;
  const keyB64 = keyTextarea.value.match(/Base64: ([^\\n]+)/)?.[1];
  if (!keyB64) return;
  const keyBytes = base64ToBytes(keyB64);
  // Stub data from CID (demo bytes)
  const stubData = new TextEncoder().encode('demo encrypted IP content');
  const decrypted = demoDecrypt(keyBytes, stubData);
  decryptResult.textContent = `CID ${cid} decrypted: ${decrypted}`;
  decryptResult.style.color = 'green';
});

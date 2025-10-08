## Pei — Hedera Micropayments dApp

Pei is a Next.js app that connects to the Hedera network via HashPack (HashConnect). It offers a clean wallet onboarding flow, conditional landing page before sign-in, live HBAR→KES rates, and quick actions to enable everyday micropayments.

### Features

- **HashPack wallet pairing (HashConnect v3)**: Securely connect a wallet and persist pairing.
- **Conditional landing**: Friendly splash screen until a wallet is connected.
- **Account overview**: Simple balance card with a live HBAR→KES exchange rate.
- **React Query data layer**: Robust fetching and caching for live data.
- **Typed, modern UI**: Next.js App Router, TypeScript, Tailwind CSS, and headless UI primitives.

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styles**: Tailwind CSS 4
- **State/Data**: @tanstack/react-query
- **Hedera**: hashconnect 3.x, @hashgraph/sdk
- **HTTP**: axios
- **UI Utilities**: shadcn-inspired UI components, lucide-react

### Installation

1. Clone and install

```bash
git clone <your-repo-url> pei
cd pei
npm install
```

2. (Optional) Configure environment variables

Create a `.env.local` file at the project root if you plan to parameterize runtime config:

```bash
# Example (not required by default setup)
NEXT_PUBLIC_HASHCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_ICON_URL=https://yourdomain.com/icon.png
```

3. Dev server

```bash
npm run dev
```

4. Build and start

```bash
npm run build
npm start
```

### Usage

- Visit `http://localhost:3000`
- On the landing page, click **Login** to open the HashPack pairing modal
- After pairing, you’ll see your connected state and main app content

Use the auth hook anywhere in client components:

```tsx
"use client";
import { useAuth } from "@/components/AuthProvider";

export function ConnectButton() {
  const { isConnected, isConnecting, pairedAccount, signIn, signOut } =
    useAuth();

  if (!isConnected) {
    return (
      <button onClick={signIn} disabled={isConnecting}>
        {isConnecting ? "Connecting…" : "Connect HashPack"}
      </button>
    );
  }

  return (
    <div>
      <span>Connected: {pairedAccount}</span>
      <button onClick={signOut}>Disconnect</button>
    </div>
  );
}
```

Live rate fetching example (already wired in `AccountCard`):

```tsx
import { useQuery } from "@tanstack/react-query";
import CryptoService from "@/app/services/CryptoService";

const { data: hbarKes = 0 } = useQuery({
  queryKey: ["hbar-rate", "kes"],
  queryFn: () => new CryptoService().getHBARExchangeRate(),
});
```

### Screenshots or Demo

- App splash screen: `public/assets/Splash Screen BgImage.png`
- Wallet connect flow: <add image or video link>
- Main dashboard: <add image or video link>

### Configuration

- **HashConnect**
  - The app initializes HashConnect for Testnet and uses app metadata in `src/components/AuthProvider.tsx`.
  - If you prefer environment variables, replace the hardcoded project/app metadata with `process.env.NEXT_PUBLIC_*` and add them to `.env.local`.
- **Next.js + HashConnect**
  - `next.config.ts` transpiles `hashconnect` to avoid build issues in Next.js.
- **Networks**
  - Default is Hedera Testnet. Change the `LedgerId` or constructor values in `AuthProvider` if you need Mainnet/Previewnet.

### Contributing

Contributions are welcome!

- Fork the repo and create a feature branch.
- Keep edits small and focused; include tests where applicable.
- Run locally and ensure typecheck/lint/build are green.
- Open a pull request with a clear description and screenshots if UI changes.

Recommended commands:

```bash
npm run lint
npm run build
```

### License

MIT. You’re free to use, modify, and distribute. If your project requires a different license, update this section and add a `LICENSE` file.

### Acknowledgements

- HashPack and the HashConnect team
- Hedera Hashgraph
- CoinGecko (exchange rates API)

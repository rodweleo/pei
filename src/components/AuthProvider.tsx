"use client";

import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { DappMetadata, HashConnect, SessionData } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";
import { useRouter } from "next/navigation";

const appMetadata: DappMetadata = {
  name: "Pei",
  description: "Your app of choice",
  icons: ["https://yourdomain.com/icon.png"],
  url: "https://pei.vercel.app",
};

interface AuthContextType {
  hashconnect: HashConnect | null;
  pairingString: string;
  pairedAccount: string | null;
  pairingData: SessionData | null;
  isConnected: boolean;
  isConnecting: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
  const [pairingString, setPairingString] = useState("");
  const [pairedAccount, setPairedAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [pairingData, setPairingData] = useState<SessionData | null>(null);
  const isConnected = !!pairingData;

  useEffect(() => {
    const init = async () => {
      try {
        const hc = new HashConnect(
          LedgerId.TESTNET,
          "1af9e8fec67ce22417c8b544a0b4adcd",
          appMetadata,
          true
        );
        setHashconnect(hc);

        // Restore persisted pairing if any
        const saved = localStorage.getItem("hashconnect-pairing");
        const savedPairingData = localStorage.getItem(
          "hashconnect-pairing-data"
        );
        if (saved) {
          const parsed = JSON.parse(saved) as {
            accountId?: string;
          };
          if (parsed.accountId) setPairedAccount(parsed.accountId);
        }

        if (savedPairingData) {
          const parsedPairingData = JSON.parse(savedPairingData);
          if (parsedPairingData) {
            setPairingData(parsedPairingData);
          }
        }

        // Initialize and generate a pairing string
        await hc.init();

        const ps = hc.pairingString as string | undefined;
        setPairingString(ps ?? "");

        // Listen for pairing events
        hc.pairingEvent.on((pairingData) => {
          setPairingData(pairingData);
          const accountId = pairingData.accountIds?.[0] ?? null;
          setPairedAccount(accountId);
          setIsConnecting(false);
          localStorage.setItem(
            "hashconnect-pairing",
            JSON.stringify({ accountId })
          );
          localStorage.setItem(
            "hashconnect-pairing-data",
            JSON.stringify(pairingData)
          );
          // eslint-disable-next-line no-console
          console.log("Paired with:", accountId);
        });

        hc.disconnectionEvent.on(() => {
          setPairedAccount(null);
          localStorage.removeItem("hashconnect-pairing");
          localStorage.removeItem("hashconnect-pairing-data");
          // eslint-disable-next-line no-console
          console.log("Wallet disconnected");
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to initialize HashConnect:", error);
        setIsConnecting(false);
      }
    };

    init();
  }, []);

  const signIn = () => {
    if (!hashconnect) return;
    setIsConnecting(true);
    hashconnect.openPairingModal();
  };

  const signOut = () => {
    if (!hashconnect) return;
    (hashconnect as any).disconnect().finally(() => {
      setPairedAccount(null);
      setPairingData(null);
      localStorage.removeItem("hashconnect-pairing");
      localStorage.removeItem("hashconnect-pairing-data");

      //redirect to homepage
      router.replace("/");
    });
  };

  const contextValue: AuthContextType = {
    hashconnect,
    pairingString,
    pairedAccount,
    isConnected,
    isConnecting,
    signIn,
    signOut,
    pairingData,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

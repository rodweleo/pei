import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { DappMetadata, HashConnect } from "hashconnect";
import { LedgerId } from "@hashgraph/sdk";

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
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null);
  const [pairingString, setPairingString] = useState("");
  const [pairedAccount, setPairedAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);

  const isConnected = !!pairedAccount;

  useEffect(() => {
    const init = async () => {
      try {
        const hc = new HashConnect(LedgerId.TESTNET, "", appMetadata, true);
        setHashconnect(hc);

        // Check for existing pairing data
        const savedPairingData = localStorage.getItem("hashconnect-pairing");
        if (savedPairingData) {
          const { accountId, topic: savedTopic } = JSON.parse(savedPairingData);
          setPairedAccount(accountId);
          setTopic(savedTopic);
        }

        // Generate pairing string for new connections
        const ps = hc.pairingString;
        setPairingString(ps || "");

        // Listen for pairing events
        hc.pairingEvent.on((pairingData) => {
          const accountId = pairingData.accountIds[0];
          setPairedAccount(accountId);
          setIsConnecting(false);

          // Save pairing data for persistence
          localStorage.setItem(
            "hashconnect-pairing",
            JSON.stringify({
              accountId,
            })
          );

          console.log("Successfully paired with account:", accountId);
        });

        // Listen for disconnection events
        hc.disconnectionEvent.on(() => {
          setPairedAccount(null);
          localStorage.removeItem("hashconnect-pairing");
          console.log("Wallet disconnected");
        });

        await hc.init();
      } catch (error) {
        console.error("Failed to initialize HashConnect:", error);
        setIsConnecting(false);
      }
    };

    init();
  }, []);

  const signIn = () => {
    if (!hashconnect) return;

    setIsConnecting(true);
    // The pairing string should be displayed to user (QR code or direct link)
    console.log("Pairing string for wallet connection:", pairingString);

    // Open HashPack or other wallet
    const walletUrl = `https://wallet.hashpack.app/pairing?data=${encodeURIComponent(
      pairingString
    )}`;
    window.open(walletUrl, "_blank");
  };

  const signOut = async () => {
    if (!hashconnect || !topic) return;

    try {
      await hashconnect.disconnect();
      setPairedAccount(null);
      setTopic(null);
      localStorage.removeItem("hashconnect-pairing");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const contextValue: AuthContextType = {
    hashconnect,
    pairingString,
    pairedAccount,
    isConnected,
    isConnecting,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

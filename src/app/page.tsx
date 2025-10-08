"use client";

import Account from "@/components/Account";
import AccountCard from "@/components/Account/AccountCard";
import { useAuth } from "@/components/AuthProvider";
import QuickLinks from "@/components/Quicklinks";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const { isConnected, signIn, isConnecting, pairedAccount } = useAuth();

  if (!isConnected) {
    return (
      <div className="h-full grid place-items-center relative">
        <Image
          src="/assets/Splash Screen BgImage.png"
          alt="Splash screen"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-12 w-full p-6">
          <div className="text-center space-y-4 bg-slate-800/30 backdrop-blur-sm p-4 rounded-xl">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold text-white">Pei</h1>
              <p className="text-gray-300 max-w-md mx-auto">
                Your gateway to seamless micropayments powered on Hedera
              </p>
            </div>
            <div>
              <Button
                onClick={signIn}
                disabled={isConnecting}
                className="w-full"
                type="button"
              >
                {isConnecting ? "Connecting…" : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Account />;
}

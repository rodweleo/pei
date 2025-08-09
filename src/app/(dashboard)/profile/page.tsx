"use client";

import { useAuth } from "@/components/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { signOut, pairingData } = useAuth();

  return (
    <main className="min-h-screen flex flex-col gap-4">
      <div className="grid place-items-center space-y-4">
        <div className="bg-gray-200 size-40 rounded-full" />
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">{pairingData?.accountIds[0]}</h1>
          <Badge className="rounded-full scale-95">
            {pairingData?.network}
          </Badge>
        </div>
      </div>
      <Button
        variant="destructive"
        className="bg-red-100 text-red-500 border border-red-500 w-full cursor-pointer hover:bg-red-200"
        onClick={signOut}
      >
        Log out
      </Button>
    </main>
  );
}

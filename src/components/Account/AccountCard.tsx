"use client";

import CryptoService from "@/app/services/CryptoService";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function AccountCard() {
  const { data: hbarExchangeRate = 0, isLoading } = useQuery({
    queryKey: ["hbar-rate", "kes"],
    queryFn: async () => new CryptoService().getHBARExchangeRate(),
    staleTime: 60_000,
  });

  const balance = 40;
  const totalConvertedBalance = (balance * hbarExchangeRate).toFixed(2);
  return (
    <Card>
      <CardHeader>
        <CardDescription>Your Balance</CardDescription>
        <CardTitle className="text-3xl font-bold">{balance} HBAR</CardTitle>
        <CardDescription>
          ~ {isLoading ? "…" : totalConvertedBalance} KES
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="space-y-2">
          <CardDescription className="flex items-center gap-4">
            <span>Exchange Rate</span>
            <Badge className="bg-green-100 border border-green-500 text-green-500 rounded-full flex items-center">
              <div className="size-2 animate-pulse rounded-full bg-green-500" />
              <span className="ml-2">Live Rate</span>
            </Badge>
          </CardDescription>
          <CardTitle>
            <p>
              1 HBAR = <span> KES {isLoading ? "…" : hbarExchangeRate} </span>
            </p>
          </CardTitle>
        </div>
      </CardFooter>
    </Card>
  );
}

import DashboardLayout from "@/app/(dashboard)/layout";
import { useAuth } from "../AuthProvider";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  const { isConnected } = useAuth();
  return <DashboardLayout>{children}</DashboardLayout>;
}

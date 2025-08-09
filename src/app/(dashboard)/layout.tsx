import Navigation from "@/components/Navigation";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full h-full ">
      <section className="flex-1 min-h-0 overflow-y-auto">{children}</section>
      <Navigation />
    </div>
  );
}

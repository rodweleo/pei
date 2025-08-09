import AccountCard from "@/components/Account/AccountCard";
import QuickLinks from "@/components/Quicklinks";

export default function Home() {
  return (
    <div className="h-screen space-y-4">
      <AccountCard />
      <QuickLinks />
    </div>
  );
}

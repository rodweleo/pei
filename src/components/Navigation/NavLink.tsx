"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkProps = {
  navLink: {
    href: string;
    label: string;
    icon: any;
  };
};
export default function NavLink(props: NavLinkProps) {
  const pathname = usePathname();
  const { navLink } = props;

  return (
    <Link
      href={navLink.href}
      className={cn(
        "flex flex-col items-center text-sm",
        pathname === navLink.href ? "font-semibold" : "text-gray-500"
      )}
    >
      <navLink.icon size={20} />
      <span>{navLink.label.toUpperCase()}</span>
    </Link>
  );
}

"use client";

import NavLink from "./NavLink";
import { ArrowRightLeft, House } from "lucide-react";

const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: ArrowRightLeft,
  },
];
export default function Navigation() {
  return (
    <nav className="sticky bottom-0 z-50 bg-gray-100 h-20">
      <ul className="list-none flex justify-around w-full h-full items-center">
        {navLinks.map((navLink, index: number) => (
          <li key={`navlink-${index}`}>
            <NavLink navLink={navLink} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

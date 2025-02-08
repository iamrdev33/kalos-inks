"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/flash", label: "Tattoo Flash" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 p-4">
      <ul className="flex justify-center gap-6">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`text-white px-4 py-2 rounded-md transition duration-300 ${
                pathname === href ? "bg-purple-800" : "hover:bg-gray-700"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

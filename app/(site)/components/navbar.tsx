"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/book-appointment", label: "Book Appointment" },
  { href: "/faq", label: "FAQ" },
  { href: "/flash", label: "Tattoo Flash" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {

      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      setVisible(scrollY < lastScrollY || scrollY < 50);

      lastScrollY = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  return (
    <nav className={`flex justify-between p-4 z-10 fixed w-full transition-transform duration-5000
       ${scrolled ? "bg-grey shadow-md" : "bg-transparent"
      } ${visible ? "translate-y-0" : "-translate-y-full"} `}>
      <h1 className="text-primary text-5xl">
        <span style={{ fontFamily: 'Blacksword' }}>Kalos</span>
        <span> Inks</span>
      </h1>
      <ul className="flex justify-center items-center gap-3">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`px-4 py-2 rounded-md transition duration-300 ${pathname === href ? "text-primary" : "hover:text-primary"
                }`}
            >
              {label}
            </Link>
          </li>
        ))}
        <li className="flex flex-row gap-4">
          <Link
            href={'https://www.facebook.com/profile.php?id=61572642881407'}
            target="_blank"
            >
            <FaFacebookF />
          </Link>
          <Link
            href={'https://instagram.com/kalos_inks'}>
            <FaInstagram />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

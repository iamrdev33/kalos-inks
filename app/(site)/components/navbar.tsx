"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCaretUp, FaCaretDown, FaFacebookF, FaInstagram } from "react-icons/fa6";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portofolio", label: "Portofolio" },
  { href: "/book-appointment", label: "Book Appointment" },
  {
    title: 'Tattoo Guide',
    links: [
      { href: "/pain-chart", label: "Pain Chart" },
      { href: "/quiz", label: "Quiz" },
    ]
  },
  {
    title: 'Help & Care',
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/aftercare", label: "Aftercare" },
    ]
  }

];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
        <span className='font-kalos'>Kalos</span>
        <span> Inks</span>
      </h1>
      <ul className="flex justify-center items-center gap-3">
        {navLinks.map((link, index) =>
          link.links ? (
            <li
              key={link.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(link.title)}
              onMouseLeave={() => setActiveDropdown('')}
            >
              <div className="hover:underline flex items-center gap-2" >
                {link.title} {activeDropdown == link.title ? <FaCaretUp /> : <FaCaretDown /> }
              </div>
              {activeDropdown == link.title &&
                <ul className="absolute top-full left-0 bg-grey border shadow-lg w-40 p-2">

                  {link.links.map(({ href, label }) =>
                    <li key={href}>
                      <Link
                        href={href}
                        className={`px-4 py-2 rounded-md transition duration-300 ${pathname === href ? "text-primary" : "hover:text-primary"
                          }`}
                      >
                        {label}
                      </Link>
                    </li>
                  )}
                </ul>
              }
            </li>
          )
            :
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-md transition duration-300 ${pathname === link.href ? "text-primary" : "hover:text-primary"
                  }`}
              >
                {link.label}
              </Link>
            </li>
        )}

        <li className="flex flex-row gap-4">
          <Link
            href={'https://www.facebook.com/profile.php?id=61572642881407'}
            target="_blank"
          >
            <FaFacebookF />
          </Link>
          <Link
            href={'https://instagram.com/kalos_inks'}
            target="_blank"
          >
            <FaInstagram />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

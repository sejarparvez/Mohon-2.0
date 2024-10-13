"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import MobileMenu from "./MobileMenu";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible =
        currentScrollPos < 200 || prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header
      className={`fixed top-0 z-50 flex h-14 w-full items-center transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0 backdrop-blur-md" : "-translate-y-20"
      } `}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-10">
        {/* Logo */}
        <div className="text-2xl font-extrabold">Mohon</div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Design
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Blood Bank
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Best Computer T.C.
          </Link>
          <Link href="/" className="transition-colors hover:text-primary">
            Login
          </Link>
        </nav>

        {/* Mobile Menu Icon for Smaller Screens */}
        <div className="md:hidden">
          <ModeToggle />
          <MobileMenu /> {/* Render the MobileMenu component here */}
        </div>

        {/* Call to Action & Social Media for Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Call to Action Button */}
          <Link href="/">
            <Button className="h-full px-6 py-1.5 text-sm font-semibold">
              Apply Now
            </Button>
          </Link>

          {/* Social Icons & Mode Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <FaSquareFacebook
                size={20}
                className="transition-colors hover:text-primary"
              />
            </Link>
            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2"
            >
              <FaSquareXTwitter
                size={20}
                className="transition-colors hover:text-primary"
              />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

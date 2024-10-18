"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { HiBars3BottomRight } from "react-icons/hi2";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2">
          <HiBars3BottomRight size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 p-6">
        <nav className="mt-8 flex flex-col gap-6 text-lg">
          <Link
            href="/about"
            className="transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About Me
          </Link>
          <Link
            href="/"
            className="transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Design
          </Link>
          <Link
            href="/"
            className="transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Blood Bank
          </Link>
          <Link
            href="/"
            className="transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Best Computer T.C.
          </Link>
          <Link
            href="/"
            className="transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </nav>

        {/* Mode Toggle and Social Icons */}
        <div className="mt-10 flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
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
            >
              <FaSquareXTwitter
                size={20}
                className="transition-colors hover:text-primary"
              />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

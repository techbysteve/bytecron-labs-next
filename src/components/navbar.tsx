"use client";

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomSubtext } from "@/lib/utils";

export function Navbar() {
  const [randomSubtext, setRandomSubtext] = useState("");

  useEffect(() => {
    setRandomSubtext(getRandomSubtext());
  }, []);

  return (
    <nav className="py-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col">
          <span className="text-2xl  font-bold  text-[#db0042]">
            Bytecron Labs
          </span>
          <span className="text-sm text-white">{randomSubtext}</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/steve-cse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="GitHub"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/bytesbysteve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="Twitter"
          >
            <TwitterLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/steve-cse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="LinkedIn"
          >
            <LinkedInLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="mailto:stevebobygeorge@proton.me"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="Email"
          >
            <EnvelopeClosedIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

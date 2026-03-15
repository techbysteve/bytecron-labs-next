import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="py-4">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex flex-col group">
          <span className="flex items-center text-xl md:text-2xl font-bold pr-2 py-0.5 md:px-3 md:py-1">
            <span className="text-[#db0042]">solo@coder</span>
            <span className="text-white">:~$</span>
            <span className="inline-block w-1.5 h-5 md:w-2 md:h-6 bg-[#db0042] ml-2 animate-blink"></span>
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/techbysteve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="GitHub"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://twitter.com/techbysteve"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white active:text-white/60"
            aria-label="Twitter"
          >
            <TwitterLogoIcon className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/steve-george-in"
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

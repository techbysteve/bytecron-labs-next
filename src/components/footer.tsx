import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 border-t border-white/10">
      <div className="container mx-auto px-4 text-center text-sm text-white/60">
        <p>
          © {currentYear} Bytecron Labs | Powered by{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 transition-colors hover:text-white"
          >
            Next.js
          </Link>
        </p>
      </div>
    </footer>
  );
}

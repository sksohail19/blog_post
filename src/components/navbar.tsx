"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/posts", label: "Essays" },
  { href: "/categories", label: "Collections" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-stone-200/80 bg-white/80 px-5 py-3 shadow-[0_24px_80px_-46px_rgba(41,37,36,0.35)] backdrop-blur md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 text-stone-950"
          onClick={closeMenu}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            TE
          </span>
          <span>
            <span className="block text-[0.68rem] font-medium uppercase tracking-[0.3em] text-stone-500">
              Editorial Platform
            </span>
            <span className="block text-xl font-semibold italic tracking-tight">
              The Editorial
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-stone-200 bg-stone-50/80 p-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition duration-200 hover:bg-white hover:text-stone-950"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://sksohail19.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition duration-200 hover:bg-white hover:text-stone-950"
              >
                About
              </a>
            </li>
          </ul>

          <div className="ml-4 flex items-center gap-3">
            <button className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition duration-200 hover:text-stone-950">
              Sign In
            </button>
            <button className="rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:bg-stone-800">
              Start Writing
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-900 transition duration-200 hover:bg-stone-100 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {isMenuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl md:hidden">
          <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white/95 p-4 shadow-[0_28px_90px_-44px_rgba(41,37,36,0.45)] backdrop-blur">
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition duration-200 hover:bg-stone-100 hover:text-stone-950"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid gap-3 border-t border-stone-200 pt-4">
              <button className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-800 transition duration-200 hover:bg-stone-100">
                Sign In
              </button>
              <button className="rounded-full bg-stone-950 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-stone-800">
                Start Writing
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const NAVIGATION_LINKS: Array<{ href: Route; label: string }> = [
  { href: "/buecher", label: "Bücher" },
  { href: "/ueber", label: "Über" },
  { href: "/events", label: "Events" },
  { href: "/presse", label: "Presse" },
  { href: "/kontakt", label: "Kontakt" }
];

const NAV_ID = "primary-navigation";

export default function Header(){
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if(!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if(event.key === "Escape"){
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleNavigation = () => setIsOpen(prev => !prev);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-brand">
          Books by Mel
        </Link>

        <button
          type="button"
          className="site-nav__toggle"
          aria-expanded={isOpen}
          aria-controls={NAV_ID}
          aria-label={isOpen ? "Navigation schließen" : "Navigation öffnen"}
          onClick={toggleNavigation}
        >
          <span className="sr-only">{isOpen ? "Navigation schließen" : "Navigation öffnen"}</span>
          <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
        </button>

        <nav
          id={NAV_ID}
          className="site-nav"
          data-open={isOpen ? "true" : "false"}
          aria-label="Hauptnavigation"
        >
          <ul className="site-nav__list">
            {NAVIGATION_LINKS.map(link => {
              const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="site-nav__link"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="site-nav__actions">
            <ThemeToggle className="site-nav__theme-toggle" />
            <Button href="/newsletter" variant="soft">
              Newsletter
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useState, type SVGProps } from "react";

const STORAGE_KEY = "theme-preference";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  className?: string;
};

const prefersDark = "(prefers-color-scheme: dark)";

function getSystemTheme(): Theme {
  if(typeof window === "undefined"){
    return "light";
  }

  return window.matchMedia(prefersDark).matches ? "dark" : "light";
}

function applyTheme(theme: Theme){
  if(typeof document === "undefined"){
    return;
  }

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function SunIcon(props: SVGProps<SVGSVGElement>){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>){
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle({ className }: ThemeToggleProps){
  const [theme, setTheme] = useState<Theme>(() => {
    if(typeof document === "undefined"){
      return "light";
    }

    const current = document.documentElement.dataset.theme;
    return current === "dark" ? "dark" : "light";
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if(typeof window === "undefined"){
      return;
    }

    let stored: Theme | null = null;

    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      if(value === "light" || value === "dark"){
        stored = value;
      }
    } catch (error) {
      stored = null;
    }

    const resolved = stored ?? getSystemTheme();
    applyTheme(resolved);
    setTheme(resolved);
    setIsReady(true);

    if(stored){
      return;
    }

    const media = window.matchMedia(prefersDark);
    const handleChange = (event: MediaQueryListEvent) => {
      const next = event.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };

    if(typeof media.addEventListener === "function"){
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }

    if(typeof media.addListener === "function"){
      media.addListener(handleChange);
      return () => media.removeListener(handleChange);
    }

    return undefined;
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";

      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (error) {
        // Ignore write errors (e.g. private mode)
      }

      applyTheme(next);
      return next;
    });
  }, []);

  const ariaLabel = useMemo(() => {
    if(theme === "dark"){
      return "Hellen Modus aktivieren";
    }

    return "Dunklen Modus aktivieren";
  }, [theme]);

  const ThumbIcon = theme === "dark" ? MoonIcon : SunIcon;

  return (
    <button
      type="button"
      className={["theme-toggle", className].filter(Boolean).join(" ")}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      disabled={!isReady}
      data-theme-state={theme}
    >
      <span aria-hidden="true" className="theme-toggle__track">
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          <SunIcon aria-hidden="true" className="theme-toggle__icon-graphic" />
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          <MoonIcon aria-hidden="true" className="theme-toggle__icon-graphic" />
        </span>
        <span className="theme-toggle__thumb">
          <ThumbIcon aria-hidden="true" className="theme-toggle__thumb-icon" />
        </span>
      </span>
    </button>
  );
}

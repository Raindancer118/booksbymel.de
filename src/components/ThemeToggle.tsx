"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

  return (
    <button
      type="button"
      className={["theme-toggle", className].filter(Boolean).join(" ")}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      data-theme={theme}
      disabled={!isReady}
    >
      <span aria-hidden="true" className="theme-toggle__icon" />
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "booksbymel.analytics-consent";
const measurementId = (
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-MN1HKKFFKX"
).trim();

type ConsentState = "unknown" | "accepted" | "declined";

type StoredConsent = Extract<ConsentState, "accepted" | "declined">;

function readStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (storedValue === "accepted" || storedValue === "declined") {
      return storedValue;
    }
  } catch (error) {
    // Swallow errors for environments where storage is not available.
  }

  return null;
}

function storeConsent(value: StoredConsent) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch (error) {
    // Ignore storage errors (e.g. private browsing modes).
  }
}

export default function AnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedConsent = readStoredConsent();

    if (storedConsent) {
      setConsent(storedConsent);
    }

    setIsReady(true);
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    storeConsent("accepted");
  };

  const handleDecline = () => {
    setConsent("declined");
    storeConsent("declined");
  };

  const shouldRenderBanner = isReady && consent === "unknown";
  const shouldLoadAnalytics = consent === "accepted" && measurementId.length > 0;

  return (
    <>
      {shouldLoadAnalytics ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-consent" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      ) : null}
      {shouldRenderBanner ? (
        <div
          className="cookie-banner"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie-Hinweis"
        >
          <div className="cookie-banner__content">
            <p className="cookie-banner__text">
              Wir verwenden Google Analytics, um zu verstehen, wie Besucher unsere
              Seite nutzen. Wir setzen erst Cookies, wenn du zustimmst.
            </p>
            <div className="cookie-banner__actions">
              <button
                type="button"
                className="cookie-banner__button cookie-banner__button--primary"
                onClick={handleAccept}
              >
                Zustimmen
              </button>
              <button
                type="button"
                className="cookie-banner__button"
                onClick={handleDecline}
              >
                Ablehnen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

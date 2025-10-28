import type { ReactNode } from "react";
import { cookies } from "next/headers";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AUTH_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import LoginForm from "../login/LoginForm";
import { createAuthenticateAction } from "../login/authenticate";

const unavailableState = { error: "Die Anmeldung ist derzeit nicht verfügbar." } as const;

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const secret = process.env.PWT_ACC ?? null;
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated = secret
    ? await verifySessionToken(token, secret)
    : false;

  if (!isAuthenticated) {
    const authenticate = createAuthenticateAction({ secret });
    const initialState = secret ? undefined : unavailableState;

    return (
      <LoginForm
        action={authenticate}
        initialState={initialState}
        disabled={!secret}
      />
    );
  }

  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  );
}

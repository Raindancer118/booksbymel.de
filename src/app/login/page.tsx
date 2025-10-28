import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';
import {
  AUTH_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  deriveSessionToken,
  verifySessionToken,
} from '@/lib/auth';

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

type FormState = {
  error?: string;
};

function resolveRedirectTarget(fromParam: string | string[] | undefined): string {
  if (
    typeof fromParam === 'string' &&
    fromParam.startsWith('/') &&
    !fromParam.startsWith('//')
  ) {
    return fromParam;
  }

  return '/';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const secret = process.env.PWT_ACC ?? null;
  const redirectTarget = resolveRedirectTarget(searchParams?.from);
  const cookieStore = cookies();
  const existingToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const isAuthenticated =
    secret && existingToken
      ? await verifySessionToken(existingToken, secret)
      : false;

  if (isAuthenticated) {
    redirect(redirectTarget);
  }

  async function authenticate(_: FormState, formData: FormData): Promise<FormState> {
    'use server';

    if (!secret) {
      return { error: 'Die Anmeldung ist derzeit nicht verfügbar.' };
    }

    const password = formData.get('password');

    if (typeof password !== 'string' || password.trim() === '') {
      return { error: 'Bitte geben Sie das Passwort ein.' };
    }

    if (password !== secret) {
      return { error: 'Das eingegebene Passwort ist ungültig.' };
    }

    const token = await deriveSessionToken(secret);
    const responseCookies = cookies();

    responseCookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    redirect(redirectTarget);
  }

  const initialState = secret
    ? undefined
    : { error: 'Die Anmeldung ist derzeit nicht verfügbar.' };

  return <LoginForm action={authenticate} initialState={initialState} disabled={!secret} />;
}

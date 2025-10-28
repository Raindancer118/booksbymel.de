import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  AUTH_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  deriveSessionToken,
} from '@/lib/auth';

export type FormState = {
  error?: string;
};

type CreateAuthenticateActionOptions = {
  secret: string | null;
};

export function resolveRedirectTarget(input: unknown): string {
  if (typeof input === 'string' && input.startsWith('/') && !input.startsWith('//')) {
    return input;
  }

  return '/';
}

export function createAuthenticateAction({ secret }: CreateAuthenticateActionOptions) {
  return async function authenticate(
    _: FormState,
    formData: FormData,
  ): Promise<FormState> {
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

    const redirectTarget = resolveRedirectTarget(formData.get('redirectTo'));
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
  };
}

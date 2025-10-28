const encoder = new TextEncoder();

export const AUTH_COOKIE_NAME = 'session_token';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');
}

async function ensureSubtleCrypto(): Promise<SubtleCrypto> {
  if (typeof crypto !== 'undefined' && crypto?.subtle) {
    return crypto.subtle;
  }

  throw new Error('SubtleCrypto is not available in this environment.');
}

export async function deriveSessionToken(secret: string): Promise<string> {
  const subtle = await ensureSubtleCrypto();
  const data = encoder.encode(secret);
  const hashBuffer = await subtle.digest('SHA-256', data);
  return toHex(hashBuffer);
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const expected = await deriveSessionToken(secret);
  return token === expected;
}

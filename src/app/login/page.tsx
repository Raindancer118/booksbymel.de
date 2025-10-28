import LoginForm from './LoginForm';
import { createAuthenticateAction, resolveRedirectTarget } from './authenticate';

type LoginPageProps = {
  searchParams?: Promise<{ from?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const secret = process.env.PWT_ACC ?? null;
  const redirectTarget = resolveRedirectTarget(resolvedSearchParams.from);
  const initialState = secret
    ? undefined
    : { error: 'Die Anmeldung ist derzeit nicht verfügbar.' };
  const authenticate = createAuthenticateAction({ secret });

  return (
    <LoginForm
      action={authenticate}
      initialState={initialState}
      disabled={!secret}
      redirectTo={redirectTarget}
    />
  );
}

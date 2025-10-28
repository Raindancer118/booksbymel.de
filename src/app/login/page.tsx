import LoginForm from './LoginForm';
import { createAuthenticateAction, resolveRedirectTarget } from './authenticate';

type LoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const secret = process.env.PWT_ACC ?? null;
  const redirectTarget = resolveRedirectTarget(searchParams?.from);
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

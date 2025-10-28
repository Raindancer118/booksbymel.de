"use client";

import { useFormState, useFormStatus } from 'react-dom';
import styles from './page.module.css';

type FormState = {
  error?: string;
};

type LoginFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialState?: FormState;
  disabled?: boolean;
};

const defaultInitialState: FormState = {};

type PasswordFieldProps = {
  disabled?: boolean;
};

function PasswordField({ disabled }: PasswordFieldProps) {
  const { pending } = useFormStatus();

  return (
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      className={styles.input}
      disabled={disabled || pending}
      required
    />
  );
}

type SubmitButtonProps = {
  disabled?: boolean;
};

function SubmitButton({ disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} type="submit" disabled={disabled || pending}>
      {pending ? 'Wird überprüft…' : 'Freischalten'}
    </button>
  );
}

export default function LoginForm({ action, initialState, disabled }: LoginFormProps) {
  const [state, formAction] = useFormState(action, initialState ?? defaultInitialState);

  return (
    <main className={styles.container}>
      <form className={styles.form} action={formAction}>
        <h1 className={styles.heading}>Seite im Aufbau</h1>
        <p className={styles.description}>
          Diese Website befindet sich im Aufbau. Mit dem richtigen Passwort können Sie
          bereits einen Blick auf die Inhalte werfen.
        </p>
        <label className={styles.label} htmlFor="password">
          Passwort
        </label>
        <PasswordField disabled={disabled} />
        {state.error ? <p className={styles.error}>{state.error}</p> : null}
        <SubmitButton disabled={disabled} />
      </form>
    </main>
  );
}

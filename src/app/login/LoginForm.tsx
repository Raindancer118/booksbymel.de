"use client";

import { useFormState, useFormStatus } from 'react-dom';
import styles from './page.module.css';

type FormState = {
  error?: string;
};

type LoginFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

const initialState: FormState = {};

function PasswordField() {
  const { pending } = useFormStatus();

  return (
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      className={styles.input}
      disabled={pending}
      required
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className={styles.button} type="submit" disabled={pending}>
      {pending ? 'Wird überprüft…' : 'Freischalten'}
    </button>
  );
}

export default function LoginForm({ action }: LoginFormProps) {
  const [state, formAction] = useFormState(action, initialState);

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
        <PasswordField />
        {state.error ? <p className={styles.error}>{state.error}</p> : null}
        <SubmitButton />
      </form>
    </main>
  );
}

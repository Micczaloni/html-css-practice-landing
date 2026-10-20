import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { signIn, signUp } from "../lib/auth-client";

// One form for both /login and /signup — mode prop switches the API call
export function Login({ mode }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "");

    try {
      const result =
        mode === "signup"
          ? await signUp.email({ email, password, name })
          : await signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message ?? "That did not work. Try again?");
        return;
      }

      navigate("/");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">
        {mode === "signup" ? "Create account" : "Sign in"}
      </h1>
      <p className="mt-2 text-gray-600">
        {mode === "signup"
          ? "Join PULSO to book classes."
          : "Welcome back — book your next session."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {mode === "signup" && (
          <Field label="Name" name="name" autoComplete="name" required />
        )}
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete={
            mode === "signup" ? "new-password" : "current-password"
          }
          required
          minLength={8}
        />

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-[#c6d947] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#b5c73a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? "One moment…"
            : mode === "signup"
              ? "Create account"
              : "Sign in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {mode === "signup" ? (
          <>
            Already have one?{" "}
            <Link to="/login" className="font-semibold text-black underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link to="/signup" className="font-semibold text-black underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}

function Field({ label, name, type = "text", ...rest }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        className="rounded-lg border border-[#d8d8d8] bg-white px-3.5 py-2.5 font-normal focus:outline-2 focus:outline-[#c6d947] focus:outline-offset-1"
        {...rest}
      />
    </label>
  );
}

export default Login;

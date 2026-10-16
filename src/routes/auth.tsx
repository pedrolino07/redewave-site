
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const { data: role, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError) throw roleError;

      if (!role) {
        await supabase.auth.signOut();
        throw new Error("Esta conta não tem permissão de administrador.");
      }

      await navigate({ to: "/admin" });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível entrar.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-xl border border-border bg-card p-8"
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">
            RedeWave
          </p>
          <h1 className="mt-2 text-2xl font-bold">Painel administrativo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Entre com sua conta de administrador.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm">E-mail</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-3"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm">Senha</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-3"
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a
          href="/"
          className="block text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Voltar ao site
        </a>
      </form>
    </main>
  );
}

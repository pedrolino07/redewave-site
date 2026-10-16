import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Contact = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  whatsapp: string;
  message: string;
  status: "novo" | "em_atendimento" | "concluido";
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    async function loadContacts() {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = sessionData.session?.user;

        if (!user) {
          await navigate({ to: "/auth" });
          return;
        }

        const { data: role, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roleError) throw roleError;

        if (!role) {
          await supabase.auth.signOut();
          await navigate({ to: "/auth" });
          return;
        }

        const { data, error: contactsError } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (contactsError) throw contactsError;

        setContacts((data ?? []) as Contact[]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os contatos.",
        );
      } finally {
        setLoading(false);
      }
    }

    void loadContacts();
  }, [navigate]);

  async function updateStatus(
    id: string,
    status: Contact["status"],
  ) {
    setError("");

    const { error } = await supabase
      .from("contact_messages")
      .update({ status })
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }

    setContacts((current) =>
      current.map((contact) =>
        contact.id === id ? { ...contact, status } : contact,
      ),
    );
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
      return;
    }

    await navigate({ to: "/auth" });
  }

  const filteredContacts = contacts.filter((contact) => {
    const term = search.toLowerCase();

    const matchesSearch = [
      contact.name,
      contact.company ?? "",
      contact.email,
      contact.whatsapp,
      contact.message,
    ].some((value) => value.toLowerCase().includes(term));

    return (
      matchesSearch &&
      (filter === "todos" || contact.status === filter)
    );
  });

  const statusLabels: Record<Contact["status"], string> = {
    novo: "Novo",
    em_atendimento: "Em atendimento",
    concluido: "Concluído",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
              RedeWave
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Painel administrativo
            </h1>
            <p className="mt-2 text-slate-400">
              Gerencie os contatos recebidos pelo site.
            </p>
          </div>

          <button
            onClick={() => void logout()}
            className="rounded-lg border border-slate-700 px-4 py-2 hover:bg-slate-800"
          >
            Sair
          </button>
        </header>

        {error && (
          <p className="mb-5 break-words rounded-lg border border-red-900 bg-red-950 p-4 text-red-200">
            {error}
          </p>
        )}

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total de contatos",
              count: contacts.length,
            },
            {
              label: "Novos",
              count: contacts.filter((c) => c.status === "novo").length,
            },
            {
              label: "Em atendimento",
              count: contacts.filter(
                (c) => c.status === "em_atendimento",
              ).length,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold">{item.count}</p>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar contatos..."
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-red-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3"
            >
              <option value="todos">Todos os status</option>
              <option value="novo">Novos</option>
              <option value="em_atendimento">Em atendimento</option>
              <option value="concluido">Concluídos</option>
            </select>
          </div>

          {loading ? (
            <p className="py-10 text-center text-slate-400">
              Carregando contatos...
            </p>
          ) : filteredContacts.length === 0 ? (
            <p className="py-10 text-center text-slate-400">
              Nenhum contato encontrado.
            </p>
          ) : (
            <div className="space-y-4">
              {filteredContacts.map((contact) => (
                <article
                  key={contact.id}
                  className="rounded-lg border border-slate-800 p-4"
                >
                  <div className="flex flex-col justify-between gap-4 sm:flex-row">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold">
                        {contact.name}
                      </h2>

                      {contact.company && (
                        <p className="text-sm text-slate-400">
                          {contact.company}
                        </p>
                      )}

                      <p className="mt-2 break-all text-sm text-slate-300">
                        {contact.email}
                      </p>
                      <p className="text-sm text-slate-300">
                        WhatsApp: {contact.whatsapp}
                      </p>
                      <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">
                        {contact.message}
                      </p>
                      <p className="mt-3 text-xs text-slate-500">
                        {new Date(contact.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <div className="sm:w-48 sm:shrink-0">
                      <label className="mb-2 block text-sm text-slate-400">
                        Status
                      </label>

                      <select
                        value={contact.status}
                        onChange={(e) =>
                          void updateStatus(
                            contact.id,
                            e.target.value as Contact["status"],
                          )
                        }
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
                      >
                        {Object.entries(statusLabels).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>

                      <a
                        href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 block rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-medium hover:bg-green-600"
                      >
                        Abrir WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
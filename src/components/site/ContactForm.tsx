import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  company: z.string().trim().max(120).optional(),
  email: z.string().trim().email("E-mail inválido").max(255),
  whatsapp: z
    .string()
    .trim()
    .regex(/^[\d\s()+-]{8,25}$/, "WhatsApp inválido"),
  message: z.string().trim().min(10, "Conte um pouco mais (mín. 10 caracteres)").max(2000),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "w-full rounded-md border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({
      ...parsed.data,
      company: parsed.data.company || null,
    });
    if (error) {
      setStatus("error");
      return;
    }
    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/30 bg-card p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="text-xl font-bold">Mensagem enviada!</h3>
        <p className="text-muted-foreground">Recebemos seu contato. Nossa equipe vai responder em breve.</p>
        <button onClick={() => setStatus("idle")} className="text-sm text-primary underline-offset-4 hover:underline">
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Nome *</span>
          <input name="name" className={field} placeholder="Seu nome" aria-invalid={!!errors.name} />
          {err("name")}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Empresa</span>
          <input name="company" className={field} placeholder="Nome da empresa" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">E-mail *</span>
          <input name="email" type="email" className={field} placeholder="voce@email.com" aria-invalid={!!errors.email} />
          {err("email")}
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">WhatsApp *</span>
          <input name="whatsapp" type="tel" className={field} placeholder="(00) 00000-0000" aria-invalid={!!errors.whatsapp} />
          {err("whatsapp")}
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">Seu projeto *</span>
        <textarea name="message" rows={5} className={field} placeholder="Conte o que você deseja construir" aria-invalid={!!errors.message} />
        {err("message")}
      </label>
      {status === "error" && (
        <p className="text-sm text-destructive">Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:glow hover:bg-primary-glow disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enviar mensagem
      </button>
    </form>
  );
}

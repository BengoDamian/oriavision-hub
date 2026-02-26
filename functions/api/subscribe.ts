export interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
}

type CFContext = {
  request: Request;
  env: Env;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export const onRequestPost = async (context: CFContext): Promise<Response> => {
  try {
    const { BREVO_API_KEY, BREVO_LIST_ID } = context.env;

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      return json({ ok: false, error: "Faltan variables de entorno (Brevo)." }, 500);
    }

    const body = (await context.request.json().catch(() => null)) as { email?: string } | null;
    const email = (body?.email || "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: "Email inválido." }, 400);
    }

    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      const low = txt.toLowerCase();
      if (low.includes("duplicate") || low.includes("already exist")) {
        return json({ ok: true });
      }
      return json({ ok: false, error: "No se pudo suscribir." }, 500);
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "Error inesperado." }, 500);
  }
};
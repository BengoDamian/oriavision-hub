type Env = {
  BREVO_API_KEY: string;
  SUPPORT_EMAIL?: string;
  BREVO_SENDER_EMAIL?: string;
};

type CFContext = {
  request: Request;
  env: Env;
};

const json = (status: number, body: any) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());

const esc = (s: string) =>
  String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

export const onRequestPost = async (context: CFContext) => {
  const { request, env } = context;

  if (!env?.BREVO_API_KEY) {
    return json(500, { ok: false, error: "Falta BREVO_API_KEY en el servidor." });
  }

  const body = await request.json().catch(() => ({}));

  // honeypot anti-bot
  if (body?.website) return json(200, { ok: true });

  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const niche = String(body?.niche || "").trim();
  const link = String(body?.link || "").trim();
  const goal = String(body?.goal || "").trim();
  const details = String(body?.details || "").trim();

  if (name.length < 2) return json(400, { ok: false, error: "Nombre inválido." });
  if (!isEmail(email)) return json(400, { ok: false, error: "Email inválido." });

  const supportTo = env.SUPPORT_EMAIL || "soporte@oriavision.com.ar";
  const senderEmail = env.BREVO_SENDER_EMAIL || "noreply@oriavision.com.ar";

  const subject = `Pedido de landing - ${name}`;

  const text = [
    "Nuevo pedido de landing (Oriavision Hub)",
    "",
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Rubro: ${niche || "-"}`,
    `Link: ${link || "-"}`,
    `Objetivo: ${goal || "-"}`,
    `Detalles: ${details || "-"}`,
    "",
    `Fecha: ${new Date().toISOString()}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px">Nuevo pedido de landing</h2>
      <p style="margin:0 0 10px"><b>Nombre:</b> ${esc(name)}<br/>
      <b>Email:</b> ${esc(email)}<br/>
      <b>Rubro:</b> ${esc(niche || "-")}<br/>
      <b>Link:</b> ${esc(link || "-")}<br/>
      <b>Objetivo:</b> ${esc(goal || "-")}</p>
      <p style="margin:0"><b>Detalles:</b><br/>${esc(details || "-").replaceAll("\n", "<br/>")}</p>
      <p style="margin:14px 0 0;color:#64748b;font-size:12px">Oriavision Hub</p>
    </div>
  `;

  const payload = {
    sender: { email: senderEmail, name: "Oriavision" },
    to: [{ email: supportTo, name: "Soporte Oriavision" }],
    replyTo: { email, name },
    subject,
    textContent: text,
    htmlContent: html,
  };

  const resp = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": env.BREVO_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    return json(500, {
      ok: false,
      error: "Brevo no pudo enviar el mail.",
      detail: errText.slice(0, 200),
    });
  }

  return json(200, { ok: true });
};
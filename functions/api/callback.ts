type CFEnv = {
  GITHUB_CLIENT_ID_PROD: string;
  GITHUB_CLIENT_SECRET_PROD: string;
  GITHUB_CLIENT_ID_PREVIEW: string;
  GITHUB_CLIENT_SECRET_PREVIEW: string;
};

type CFContext = {
  request: Request;
  env: CFEnv;
};

function pickClient(env: CFEnv, host: string) {
  const isPreview = host.includes(".pages.dev");
  return isPreview
    ? { id: env.GITHUB_CLIENT_ID_PREVIEW, secret: env.GITHUB_CLIENT_SECRET_PREVIEW }
    : { id: env.GITHUB_CLIENT_ID_PROD, secret: env.GITHUB_CLIENT_SECRET_PROD };
}

function render(status: "success" | "error", content: any) {
  const html = `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  };
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
</script>`;
  return new Response(html, { headers: { "content-type": "text/html;charset=UTF-8" } });
}

export async function onRequest(context: CFContext) {
  const { request, env } = context;
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });

  const { id: client_id, secret: client_secret } = pickClient(env, url.host);

  const r = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      "user-agent": "oriavision-hub-decap-oauth",
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  });

  const result = await r.json();

  if (result.error) return render("error", result);

  return render("success", { token: result.access_token, provider: "github" });
}
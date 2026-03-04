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

function pickClientId(env: CFEnv, host: string) {
  const isPreview = host.includes(".pages.dev");
  return isPreview ? env.GITHUB_CLIENT_ID_PREVIEW : env.GITHUB_CLIENT_ID_PROD;
}

export async function onRequest(context: CFContext) {
  const { request, env } = context;
  const url = new URL(request.url);

  const client_id = pickClientId(env, url.host);

  const redirectUrl = new URL("https://github.com/login/oauth/authorize");
  redirectUrl.searchParams.set("client_id", client_id);
  redirectUrl.searchParams.set("redirect_uri", `${url.origin}/api/callback`);
  redirectUrl.searchParams.set("scope", "repo user");

  return Response.redirect(redirectUrl.href, 302);
}
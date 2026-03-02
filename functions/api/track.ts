type Env = {};

type CFContext = {
  request: Request;
  env: Env;
};

export const onRequestGet = async (context: CFContext) => {
  const url = new URL(context.request.url);

  const e = (url.searchParams.get("e") || "").slice(0, 48);
  const p = (url.searchParams.get("p") || "").slice(0, 80);

  return new Response(JSON.stringify({ ok: true, e, p }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
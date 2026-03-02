type Env = {};

type CFContext = {
  request: Request;
  env: Env;
};

function handle(request: Request) {
  const url = new URL(request.url);
  const e = (url.searchParams.get("e") || "").slice(0, 48);
  const p = (url.searchParams.get("p") || "").slice(0, 80);

  return new Response(JSON.stringify({ ok: true, e, p }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const onRequestGet = async (ctx: CFContext) => handle(ctx.request);
export const onRequestPost = async (ctx: CFContext) => handle(ctx.request);
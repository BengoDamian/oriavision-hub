const [url, debugPort = "9230"] = process.argv.slice(2);
if (!url) throw new Error("Uso: node scripts/qa-browser-page.mjs <url> [puerto]");

const pages = await (await fetch(`http://127.0.0.1:${debugPort}/json`)).json();
const page = pages.find((item) => item.type === "page") ?? pages[0];
if (!page) throw new Error("No hay una página de Chrome disponible");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let id = 0;
const pending = new Map();
const problems = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  } else if (message.method === "Runtime.exceptionThrown") {
    const details = message.params.exceptionDetails;
    problems.push(details.exception?.description || details.text || "runtime exception");
  } else if (message.method === "Network.responseReceived" && message.params.response.status >= 400) {
    problems.push(`${message.params.response.status} ${message.params.response.url}`);
  }
});
const call = (method, params = {}) => new Promise((resolve) => {
  const callId = ++id;
  pending.set(callId, resolve);
  socket.send(JSON.stringify({ id: callId, method, params }));
});

await call("Page.enable");
await call("Runtime.enable");
await call("Network.enable");
await call("Page.navigate", { url });
await new Promise((resolve) => setTimeout(resolve, 2000));
const result = await call("Runtime.evaluate", {
  expression: `({title:document.title,h1:document.querySelector('h1')?.innerText,html:document.documentElement.outerHTML.length})`,
  returnByValue: true,
});
console.log(JSON.stringify({ url, page: result.result?.result?.value, problems }, null, 2));
socket.close();

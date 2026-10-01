(() => {
  const script = document.currentScript;
  const family = script?.dataset.family || "este diseño";
  const variant = script?.dataset.variant || "Original";
  const root = (script?.dataset.root || location.pathname).replace(/\/$/, "");
  const demoUrl = `${location.origin}${root}/`;
  const whatsappNumber = "5491127575675";

  const messageFor = (label) =>
    `Hola, ORIAVISION. Quiero consultar por una web como ${family}, variante ${variant}. Vi este diseño: ${demoUrl}. Sección: ${label || "Consulta general"}.`;

  const whatsappUrl = (label) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageFor(label))}`;

  function normalizeContactLinks(scope = document) {
    scope.querySelectorAll?.("a[href]").forEach((anchor) => {
      const raw = anchor.getAttribute("href") || "";
      const label = (anchor.textContent || anchor.getAttribute("aria-label") || "Consulta general").trim();

      if (/\/(?:admin|panel)\/?(?:[?#].*)?$/i.test(raw)) {
        anchor.remove();
        return;
      }

      if (/^(?:https?:\/\/)?(?:wa\.me|api\.whatsapp\.com)\//i.test(raw) || /^(?:tel|mailto):/i.test(raw)) {
        anchor.href = whatsappUrl(label);
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        return;
      }

      if (raw.startsWith("/") && !raw.startsWith("//") && !raw.startsWith(`${root}/`) && !raw.startsWith("/demos/")) {
        anchor.setAttribute("href", `${root}${raw}`);
      }
    });
  }

  function showConfirmation() {
    let dialog = document.getElementById("oriavision-demo-confirmation");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "oriavision-demo-confirmation";
      dialog.setAttribute("aria-labelledby", "oriavision-demo-confirmation-title");
      dialog.innerHTML = `
        <div style="max-width:32rem;padding:1.5rem;font:16px/1.5 system-ui,sans-serif;color:#172033;background:#fff;border-radius:1rem">
          <h2 id="oriavision-demo-confirmation-title" style="margin:0 0 .75rem;font:700 1.35rem/1.2 system-ui,sans-serif">Simulación completada</h2>
          <p style="margin:0 0 1rem">No se registró ningún turno ni se enviaron datos. Esta agenda forma parte de una demostración de ORIAVISION.</p>
          <div style="display:flex;gap:.75rem;flex-wrap:wrap">
            <button type="button" data-close style="min-height:44px;padding:.65rem 1rem;border:1px solid #172033;border-radius:999px;background:#172033;color:#fff;font:700 .95rem system-ui,sans-serif;cursor:pointer">Entendido</button>
            <a href="${whatsappUrl("Agenda de demostración")}" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;min-height:44px;padding:.65rem 1rem;border:1px solid #172033;border-radius:999px;color:#172033;text-decoration:none;font:700 .95rem system-ui,sans-serif">Consultar a ORIAVISION</a>
          </div>
        </div>`;
      dialog.style.cssText = "max-width:min(90vw,34rem);padding:0;border:0;border-radius:1rem;box-shadow:0 24px 80px #0006";
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog || event.target.closest?.("[data-close]")) dialog.close();
      });
      document.body.append(dialog);
    }

    if (typeof dialog.showModal === "function") dialog.showModal();
  }

  document.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      showConfirmation();
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      const anchor = event.target.closest?.("a[href]");
      if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const url = new URL(anchor.href, location.href);
      if (url.origin === location.origin && url.pathname.startsWith(`${root}/`) && url.href !== location.href) {
        event.preventDefault();
        event.stopImmediatePropagation();
        location.assign(url.href);
      }
    },
    true,
  );

  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const method = String(init.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
    const url = new URL(input instanceof Request ? input.url : String(input), location.href);
    const isDemoMutation = method !== "GET" && method !== "HEAD" && url.origin === location.origin && /\/(?:api\/)?(?:reserv|turn|booking|contact)/i.test(url.pathname);

    if (isDemoMutation) {
      showConfirmation();
      return Promise.resolve(
        new Response(JSON.stringify({ ok: true, demo: true, message: "No se registró ningún turno." }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    }

    return originalFetch(input, init);
  };

  function initializeLinks() {
    normalizeContactLinks();
    new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) normalizeContactLinks(node);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeLinks, { once: true });
  } else {
    initializeLinks();
  }
})();

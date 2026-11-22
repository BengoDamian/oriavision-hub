(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.inspiration-design')];
  const open = document.querySelector('#inspiration-saved');
  const dialog = document.querySelector('.inspiration-favorites');
  const items = document.querySelector('#inspiration-favorites-items');
  const note = document.querySelector('#inspiration-storage-note');
  const toast = document.querySelector('.inspiration-toast');
  if (!open || !dialog || !items) return;
  const key = 'oriavision:inspiration:favorites:v1';
  const variants = new Map(cards.flatMap(card => [...card.querySelectorAll('input[type="radio"]')].map(input => [input.dataset.url, input.dataset])));
  let saved = new Set(), persistent = true, timeout;
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      saved = new Set(Array.isArray(value) ? value.filter(url => variants.has(url)) : []);
    } catch { persistent = false; }
  }
  function sync() {
    open.querySelector('span').textContent = saved.size;
    cards.forEach(card => {
      const input = card.querySelector('input:checked');
      const button = card.querySelector('.design-save');
      const selected = saved.has(input.dataset.url);
      button.hidden = false;
      button.textContent = selected ? 'Guardado' : 'Guardar';
      button.setAttribute('aria-pressed', String(selected));
      button.setAttribute('aria-label', `${selected ? 'Quitar de guardados' : 'Guardar'} ${input.dataset.title}`);
    });
    note.textContent = persistent ? 'Tus guardados quedan solo en este navegador; no se envían automáticamente.' : 'Este navegador no permite conservar los guardados al cerrar la página.';
  }
  function persist() {
    try { localStorage.setItem(key, JSON.stringify([...saved])); persistent = true; }
    catch { persistent = false; }
    sync();
  }
  function announce(message) {
    clearTimeout(timeout); toast.textContent = message; toast.hidden = false;
    timeout = setTimeout(() => toast.hidden = true, 2200);
  }
  function link(text, url) {
    const a = document.createElement('a'); a.textContent = text; a.href = url;
    a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }
  function render() {
    items.replaceChildren();
    if (!saved.size) {
      const empty = document.createElement('p'); empty.textContent = 'Elegí una paleta y tocá Guardar. Vas a encontrar acá cada diseño con el color que elegiste.'; items.append(empty); return;
    }
    [...saved].forEach((url, index) => {
      const data = variants.get(url), row = document.createElement('div'); row.className = 'favorite-item';
      const img = document.createElement('img'); img.src = data.preview; img.alt = ''; img.width = 120; img.height = 80; img.loading = 'lazy';
      const body = document.createElement('div'), title = document.createElement('strong'); title.textContent = data.title;
      const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Quitar'; remove.setAttribute('aria-label', `Quitar ${data.title} de guardados`);
      remove.addEventListener('click', () => {
        saved.delete(url); persist(); render();
        const buttons = [...items.querySelectorAll('button')];
        (buttons[Math.min(index, buttons.length - 1)] || dialog.querySelector('.favorites-close')).focus();
      });
      body.append(title, link('Ver sitio', url), link('Consultar', data.whatsapp), remove); row.append(img, body); items.append(row);
    });
  }
  cards.forEach(card => {
    card.querySelector('.design-save').addEventListener('click', () => {
      const data = card.querySelector('input:checked').dataset;
      if (saved.has(data.url)) { saved.delete(data.url); announce('Diseño quitado de tus guardados.'); }
      else { saved.add(data.url); announce('Diseño guardado con la paleta elegida.'); }
      persist();
    });
    card.addEventListener('change', sync);
  });
  open.hidden = false;
  open.addEventListener('click', () => { render(); dialog.showModal(); });
  dialog.querySelector('.favorites-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => open.focus());
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) { read(); sync(); if (dialog.open) render(); } });
  window.addEventListener('pageshow', () => { read(); sync(); });
  read(); sync();
})();

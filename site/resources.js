(() => {
  const search = document.querySelector('#guide-search');
  if (search) {
    const cards = [...document.querySelectorAll('[data-guide]')];
    const count = document.querySelector('#guide-results-count');
    const empty = document.querySelector('.resource-empty');
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    function filter() {
      const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
      let visible = 0;
      cards.forEach(card => {
        card.hidden = !words.every(word => normalize(card.textContent).includes(word));
        if (!card.hidden) visible++;
      });
      count.textContent = `${visible} ${visible === 1 ? 'guía' : 'guías'} ${words.length ? 'para esta búsqueda' : 'para explorar'}`;
      empty.hidden = visible > 0;
    }
    search.addEventListener('input', filter);
    document.querySelector('[data-clear-search]')?.addEventListener('click', () => {
      search.value = '';
      filter();
      search.focus();
    });
    filter();
  }
  const copy = document.querySelector('[data-copy-template]');
  if (copy) {
    copy.addEventListener('click', async () => {
      const field = document.querySelector('.guide-template textarea');
      const status = document.querySelector('.guide-copy-status');
      try {
        await navigator.clipboard.writeText(field.value);
        status.textContent = 'Ficha copiada. Ya podés pegarla y completarla.';
      } catch {
        field.focus();
        field.select();
        status.textContent = 'Seleccionamos la ficha. Usá la opción Copiar de tu dispositivo.';
      }
    });
  }
})();

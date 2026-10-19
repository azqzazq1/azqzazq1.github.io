'use strict';
// No build step, backend, tracking, or search service needed.
(() => {
  const posts = window.WRITING_POSTS || [];
  const escapeHtml = (str) => String(str).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const renderRow = (p) => `<a class="writing-row" href="${escapeHtml(p.url)}">
    <span class="writing-type">${escapeHtml(p.kind)} · ${escapeHtml(p.date)}</span>
    <h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.excerpt)}</p>
    <span class="row-arrow" aria-hidden="true">↗</span></a>`;
  const latest = document.querySelector('[data-writing-latest]');
  if (latest && posts.length) {
    latest.innerHTML = posts.slice(0, 3).map(renderRow).join('');
  }

  const archive = document.querySelector('[data-writing-archive]');
  if (!archive) return;
  const input = document.querySelector('#archive-search');
  const filters = [...document.querySelectorAll('[data-archive-filter]')];
  const count = document.querySelector('#archive-count');
  const more = document.querySelector('#archive-more');
  const empty = document.querySelector('#archive-empty');
  const pageSize = 12;
  let category = 'all';
  let shown = pageSize;
  function refresh(reset = false) {
    if (reset) shown = pageSize;
    const query = (input?.value || '').trim().toLocaleLowerCase('en');
    const found = posts.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const searchable = [p.title, p.excerpt, p.kind, ...p.topics].join(' ').toLocaleLowerCase('en');
      return matchesCategory && (!query || searchable.includes(query));
    });
    archive.innerHTML = found.slice(0, shown).map(renderRow).join('');
    count.textContent = `${found.length} ${found.length === 1 ? 'note' : 'notes'} found${found.length > shown ? `; showing ${shown}` : ''}.`;
    more.hidden = found.length <= shown;
    empty.hidden = found.length !== 0;
  }
  input?.addEventListener('input', () => refresh(true));
  filters.forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.archiveFilter;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    refresh(true);
  }));
  more?.addEventListener('click', () => { shown += pageSize; refresh(); });
  refresh();
})();

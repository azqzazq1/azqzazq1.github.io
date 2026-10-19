'use strict';
// Content and navigation work without JavaScript; filtering is progressive enhancement.
const filterBar = document.querySelector('.filters');
if (filterBar) {
  const buttons = [...filterBar.querySelectorAll('button[data-filter]')];
  const entries = [...document.querySelectorAll('.writing-row[data-category]')];
  const status = document.querySelector('.filter-status');
  filterBar.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filterBar.contains(button)) return;
    const category = button.dataset.filter;
    for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
    for (const entry of entries) entry.hidden = category !== 'all' && entry.dataset.category !== category;
    const count = entries.filter((entry) => !entry.hidden).length;
    status.textContent = `${count} ${count === 1 ? 'note' : 'notes'} shown.`;
  });
}

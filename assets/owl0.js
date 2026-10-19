(function () {
  'use strict';
  function decodeAddress(value) {
    if (!/^(?:0x)?[0-9a-f]{1,16}$/i.test(value.trim())) throw new Error('Enter one hexadecimal address, up to 16 digits.');
    const address = BigInt('0x' + value.trim().replace(/^0x/i, ''));
    const upper = address >> 48n;
    if (upper !== (((address >> 47n) & 1n) ? 65535n : 0n)) throw new Error('Non-canonical under the 48-bit model: bits 63–48 must sign-extend bit 47.');
    return { indices: [39n, 30n, 21n, 12n].map(shift => Number((address >> shift) & 511n)), offset: '0x' + (address & 4095n).toString(16), address: '0x' + address.toString(16).padStart(16, '0') };
  }
  function estimateBudget(rate, cost) { const extra = rate * cost / 1000; return { extra, total: 1 + extra }; }
  if (typeof module !== 'undefined' && module.exports) module.exports = { decodeAddress, estimateBudget };
  if (typeof document === 'undefined') return;
  const byId = id => document.getElementById(id);
  if (!byId('exit-demo')) return;
  document.querySelectorAll('.owl-article .demo-controls').forEach(el => { el.hidden = false; });
  const messages = [
    'The guest executes in VMX non-root operation. Its CPL does not identify the virtualization domain.',
    'CPUID causes a VM-exit. Hardware supplies exit information and saves the defined guest state; software preserves the additional register context it needs.',
    'The handler interprets the requested CPUID leaf, supplies register results, and records bounded evidence. Logging must not determine continuation semantics.',
    'For this emulated instruction, advance to its valid continuation and enter the guest. Fault, retry and pending-event cases require their own policy.'
  ];
  let stage = 0, timer = null;
  function stop() { clearTimeout(timer); timer = null; byId('exit-play').textContent = 'Play sequence'; byId('exit-play').setAttribute('aria-pressed', 'false'); }
  function renderStage() {
    document.querySelectorAll('.exit-stages li').forEach((el, i) => { el.classList.toggle('is-active', i === stage); if (i === stage) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); });
    byId('exit-status').textContent = `${stage + 1} / 4 — ${messages[stage]}`;
    byId('exit-next').disabled = stage === 3;
  }
  byId('exit-next').addEventListener('click', () => { stop(); stage = Math.min(3, stage + 1); renderStage(); });
  byId('exit-reset').addEventListener('click', () => { stop(); stage = 0; renderStage(); });
  byId('exit-play').addEventListener('click', () => {
    if (timer) { stop(); return; }
    if (stage === 3) stage = 0;
    renderStage(); byId('exit-play').textContent = 'Pause'; byId('exit-play').setAttribute('aria-pressed', 'true');
    const tick = () => { stage++; renderStage(); if (stage === 3) stop(); else timer = setTimeout(tick, 2200); };
    timer = setTimeout(tick, 2200);
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  renderStage();
  function renderAddress() {
    const input = byId('virtual-address');
    const ids = ['idx-pml4', 'idx-pdpt', 'idx-pd', 'idx-pt', 'idx-offset'];
    try {
      const result = decodeAddress(input.value);
      [...result.indices, result.offset].forEach((value, i) => { byId(ids[i]).textContent = value; });
      input.removeAttribute('aria-invalid');
      byId('address-status').textContent = `${result.address} is canonical under the 48-bit model. Offset: ${result.offset}. These indices do not prove that a mapping exists.`;
    } catch (error) { input.setAttribute('aria-invalid', 'true'); ids.forEach(id => { byId(id).textContent = '—'; }); byId('address-status').textContent = error.message; }
  }
  byId('address-form').addEventListener('submit', event => { event.preventDefault(); renderAddress(); });
  byId('address-example').addEventListener('click', () => { byId('virtual-address').value = '0x00007fff12345678'; renderAddress(); });
  renderAddress();
  function gate(id, title, detail, state) { const el = byId(id); el.className = 'gate ' + state; el.replaceChildren(document.createTextNode(title)); const span = document.createElement('span'); span.textContent = detail; el.append(span); }
  function renderPermissions() {
    const guest = byId('guest-allow').value === 'yes', ept = byId('ept-allow').value === 'yes';
    gate('guest-gate', 'Guest protection', guest ? 'ALLOW' : 'DENY', guest ? 'allowed' : 'denied');
    gate('ept-gate', 'EPT protection', guest ? (ept ? 'ALLOW' : 'DENY') : 'NOT REACHED', guest ? (ept ? 'allowed' : 'denied') : '');
    gate('access-outcome', !guest ? 'Guest #PF' : ept ? 'Write permitted' : 'EPT violation', !guest ? 'Guest protection boundary' : ept ? 'Both checks allow' : 'Monitor policy boundary', 'outcome');
    byId('permission-status').textContent = !guest ? 'Guest protection rejects the write: a guest page fault in this model. The final EPT write check is not reached.' : ept ? 'Both protection checks allow the write in this simplified model.' : 'Guest protection allows the write, but EPT denies it: an EPT-violation VM-exit in this model. The write has not completed.';
  }
  ['guest-allow', 'ept-allow'].forEach(id => byId(id).addEventListener('change', renderPermissions));
  function renderBudget() {
    const rate = Number(byId('exit-rate').value), cost = Number(byId('exit-cost').value), result = estimateBudget(rate, cost);
    byId('rate-label').textContent = rate.toFixed(1); byId('cost-label').textContent = cost;
    document.querySelector('.budget-baseline').style.width = `${100 / result.total}%`;
    document.querySelector('.budget-extra').style.width = `${100 * result.extra / result.total}%`;
    document.querySelector('.budget-chart').setAttribute('aria-label', `Hypothetical model: 1 unit baseline work and ${result.extra.toFixed(2)} units additional exit cost; ${result.total.toFixed(2)} times total`);
    byId('budget-result').querySelector('strong').textContent = result.total.toFixed(2) + '×';
    byId('budget-result').querySelector('span').textContent = Math.round(result.extra * 100) + '% additional time';
  }
  ['exit-rate', 'exit-cost'].forEach(id => byId(id).addEventListener('input', renderBudget));
})();

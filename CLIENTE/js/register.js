(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const panes = $$('.step-pane');
  const next = $('.register-next');
  const back = $('.register-back');
  let current = 0;

  async function sha256(text) {
    if (globalThis.crypto?.subtle) {
      const data = new TextEncoder().encode(text);
      const hash = await globalThis.crypto.subtle.digest('SHA-256', data);
      return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
    }
    let hash = 2166136261;
    for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
    return `demo-${(hash >>> 0).toString(16)}`;
  }

  for (let i = 1; i <= 31; i++) $('#regDay').insertAdjacentHTML('beforeend', `<option value="${i}">${i}</option>`);
  ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].forEach((month, index) => $('#regMonth').insertAdjacentHTML('beforeend', `<option value="${index + 1}">${month}</option>`));
  for (let year = new Date().getFullYear() - 18; year >= 1940; year--) $('#regYear').insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`);

  function passwordStatus() {
    const value = $('#regPassword').value;
    const rules = { length: value.length >= 8, upper: /[A-Z]/.test(value), number: /\d/.test(value), symbol: /[^A-Za-z0-9]/.test(value) };
    Object.entries(rules).forEach(([rule, ok]) => $(`[data-rule="${rule}"]`).classList.toggle('passed', ok));
    return Object.values(rules).every(Boolean);
  }

  function validate() {
    const required = [...panes[current].querySelectorAll('[data-required]')];
    let valid = required.every(element => element.type === 'checkbox' ? element.checked : element.value.trim() !== '');
    if (current === 0) valid = valid && $('#regEmail').validity.valid && /^[0-9A-Za-z-]{8,12}$/.test($('#regDocument').value.trim());
    if (current === 1) {
      const matches = $('#regPassword').value === $('#regPasswordConfirm').value;
      valid = valid && passwordStatus() && matches;
      $('.register-inline-message').textContent = $('#regPasswordConfirm').value && !matches ? 'Las contraseñas no coinciden.' : '';
    }
    next.disabled = !valid; next.classList.toggle('enabled', valid);
  }

  function buildSummary() {
    $('#registerSummary').innerHTML = `<dl><dt>Cliente</dt><dd>${$('#regNames').value} ${$('#regLastName1').value} ${$('#regLastName2').value}</dd><dt>Usuario</dt><dd>${$('#regUsername').value}</dd><dt>Correo</dt><dd>${$('#regEmail').value}</dd><dt>Documento</dt><dd>${$('#regDocType').value} ${$('#regDocument').value}</dd></dl>`;
  }

  function render() {
    panes.forEach((pane, index) => pane.classList.toggle('active', index === current));
    back.style.display = current > 0 ? 'inline-flex' : 'none';
    next.textContent = current === panes.length - 1 ? 'CREAR CUENTA' : 'SIGUIENTE';
    if (current === 2) buildSummary();
    validate();
  }

  $$('[data-required], #regPasswordConfirm').forEach(element => { element.addEventListener('input', validate); element.addEventListener('change', validate); });
  $$('[data-toggle-password]').forEach(button => button.addEventListener('click', () => { const input = $(button.dataset.togglePassword); input.type = input.type === 'password' ? 'text' : 'password'; button.textContent = input.type === 'password' ? '◉' : '◎'; }));

  next.addEventListener('click', async () => {
    if (next.disabled) return;
    if (current < panes.length - 1) { current++; render(); return; }
    next.disabled = true; next.textContent = 'CREANDO...';
    const client = {
      username: $('#regUsername').value.trim(), email: $('#regEmail').value.trim(), names: $('#regNames').value.trim(), lastName1: $('#regLastName1').value.trim(), lastName2: $('#regLastName2').value.trim(), nationality: $('#regNationality').value, documentType: $('#regDocType').value, document: $('#regDocument').value.trim(), phone: $('#regPhone').value.trim(), birthDate: `${$('#regYear').value}-${String($('#regMonth').value).padStart(2,'0')}-${String($('#regDay').value).padStart(2,'0')}`, passwordHash: await sha256($('#regPassword').value), verified: false, balances: { cash: 0, withdrawable: 0, bonus: 0 }, bonuses: [{ name: 'Bono de bienvenida', amount: 0, status: 'Pendiente de activación demo' }], history: [], marketingAccepted: $('#regMarketing').checked
    };
    localStorage.setItem('acClient', JSON.stringify(client));
    localStorage.setItem('acSession', 'active');
    next.textContent = 'CUENTA CREADA';
    setTimeout(() => location.href = 'index.html', 700);
  });
  back.addEventListener('click', () => { if (current > 0) { current--; render(); } });
  render();
})();

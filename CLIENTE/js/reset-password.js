(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const form = $('#resetForm'); const password = $('#newPassword'); const confirm = $('#confirmNewPassword'); const button = $('.reset-submit'); const message = $('.reset-message');
  async function sha256(text) { if (globalThis.crypto?.subtle) { const data = new TextEncoder().encode(text); const hash = await globalThis.crypto.subtle.digest('SHA-256', data); return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2,'0')).join(''); } let hash = 2166136261; for (const char of text) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619); return `demo-${(hash >>> 0).toString(16)}`; }
  function validate() {
    const value = password.value; const rules = { length: value.length >= 8, upper: /[A-Z]/.test(value), number: /\d/.test(value), symbol: /[^A-Za-z0-9]/.test(value) };
    Object.entries(rules).forEach(([rule, ok]) => $(`[data-rule="${rule}"]`).classList.toggle('passed', ok));
    const matches = value && value === confirm.value; button.disabled = !(Object.values(rules).every(Boolean) && matches); button.classList.toggle('enabled', !button.disabled); message.textContent = confirm.value && !matches ? 'Las contraseñas no coinciden.' : '';
  }
  [password, confirm].forEach(input => input.addEventListener('input', validate));
  $$('[data-toggle-password]').forEach(toggle => toggle.addEventListener('click', () => { const input = $(toggle.dataset.togglePassword); input.type = input.type === 'password' ? 'text' : 'password'; toggle.textContent = input.type === 'password' ? '◉' : '◎'; }));
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (button.disabled) return;
    const recoveryEmail = sessionStorage.getItem('acRecoveryEmail') || 'demo@atlantic.edu';
    let client; try { client = JSON.parse(localStorage.getItem('acClient')) || {}; } catch { client = {}; }
    if (!client.email || client.email.toLowerCase() === recoveryEmail.toLowerCase()) { client.email = client.email || recoveryEmail; client.username = client.username || (recoveryEmail === 'demo@atlantic.edu' ? 'demo' : recoveryEmail.split('@')[0]); client.names = client.names || 'Cliente'; client.passwordHash = await sha256(password.value); client.balances = client.balances || {cash:0,withdrawable:0,bonus:0}; client.history = client.history || []; localStorage.setItem('acClient', JSON.stringify(client)); }
    message.textContent = 'Contraseña actualizada correctamente.'; button.disabled = true; button.textContent = 'ACTUALIZADA'; sessionStorage.removeItem('acRecoveryEmail');
    setTimeout(() => location.href = 'recuperacion-exitosa.html', 700);
  });
})();

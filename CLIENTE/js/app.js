(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `S/${Number(value || 0).toFixed(2)}`;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const DEFAULT_CLIENT = {
    username: 'demo', email: 'demo@atlantic.edu', names: 'Dslogan', lastName1: 'Demo', lastName2: 'Académico', phone: '999 999 999', document: '00000000', verified: false,
    balances: { cash: 0, withdrawable: 0, bonus: 0 },
    bonuses: [{ name: 'Bono de bienvenida', amount: 0, status: 'Disponible al realizar una operación demo' }],
    history: []
  };

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

  function readClient() {
    try { return { ...DEFAULT_CLIENT, ...(JSON.parse(localStorage.getItem('acClient')) || {}) }; }
    catch { return { ...DEFAULT_CLIENT }; }
  }
  function saveClient(client) { localStorage.setItem('acClient', JSON.stringify(client)); }
  function isLoggedIn() { return localStorage.getItem('acSession') === 'active' || sessionStorage.getItem('acSession') === 'active'; }
  function setSession(remember) { (remember ? localStorage : sessionStorage).setItem('acSession', 'active'); }
  function clearSession() { localStorage.removeItem('acSession'); sessionStorage.removeItem('acSession'); }

  const overlay = $('.login-overlay');
  const userInput = $('#loginUser');
  const passwordInput = $('#loginPassword');
  const submitButton = $('.login-submit');
  const loginForm = $('#loginForm');
  const loginMessage = $('.form-message');
  const clientDrawer = $('.client-drawer');
  const clientBackdrop = $('.client-backdrop');
  const depositOverlay = $('.deposit-overlay');
  const clientModalOverlay = $('.client-modal-overlay');
  const toast = $('.toast');
  let selectedMethod = null;
  let activeCategory = 'all';

  function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  function lockBody(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function openLogin() {
    closeDrawer();
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    lockBody(true);
    setTimeout(() => userInput?.focus(), 120);
  }
  function closeLogin() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (!depositOverlay.classList.contains('open') && !clientModalOverlay.classList.contains('open')) lockBody(false);
  }

  function renderSession() {
    const logged = isLoggedIn();
    $('.logged-out-actions').hidden = logged;
    $('.logged-in-actions').hidden = !logged;
    if (logged) renderClient();
  }

  function renderClient() {
    const client = readClient();
    $('#drawerName').textContent = client.names || client.username;
    $('#cashBalance').textContent = money(client.balances?.cash);
    $('#withdrawableBalance').textContent = money(client.balances?.withdrawable);
    $('#bonusBalance').textContent = money(client.balances?.bonus);
    const warning = $('.identity-warning');
    warning.hidden = !!client.verified;
    $('.withdraw-trigger').disabled = !client.verified || Number(client.balances?.withdrawable || 0) <= 0;
  }

  function openDrawer() {
    if (!isLoggedIn()) return openLogin();
    renderClient();
    clientDrawer.classList.add('open');
    clientDrawer.setAttribute('aria-hidden', 'false');
    clientBackdrop.classList.add('show');
    clientBackdrop.setAttribute('aria-hidden', 'false');
    lockBody(true);
  }
  function closeDrawer() {
    clientDrawer.classList.remove('open');
    clientDrawer.setAttribute('aria-hidden', 'true');
    clientBackdrop.classList.remove('show');
    clientBackdrop.setAttribute('aria-hidden', 'true');
    if (!overlay.classList.contains('open') && !depositOverlay.classList.contains('open') && !clientModalOverlay.classList.contains('open')) lockBody(false);
  }

  function openDeposit() {
    if (!isLoggedIn()) return openLogin();
    closeDrawer();
    $('.payment-methods').hidden = false;
    $('.deposit-step').hidden = true;
    $('.deposit-message').textContent = '';
    depositOverlay.classList.add('open');
    depositOverlay.setAttribute('aria-hidden', 'false');
    lockBody(true);
  }
  function closeDeposit() {
    depositOverlay.classList.remove('open');
    depositOverlay.setAttribute('aria-hidden', 'true');
    lockBody(false);
  }

  function openClientModal(title, html) {
    closeDrawer();
    $('#clientModalTitle').textContent = title;
    $('#clientModalBody').innerHTML = html;
    clientModalOverlay.classList.add('open');
    clientModalOverlay.setAttribute('aria-hidden', 'false');
    lockBody(true);
  }
  function closeClientModal() {
    clientModalOverlay.classList.remove('open');
    clientModalOverlay.setAttribute('aria-hidden', 'true');
    lockBody(false);
  }

  function validateLogin() {
    const valid = userInput.value.trim() && passwordInput.value;
    submitButton.disabled = !valid;
    submitButton.classList.toggle('enabled', !!valid);
  }

  async function authenticate(username, password) {
    const client = readClient();
    const matchesUser = [client.username, client.email].filter(Boolean).some(value => String(value).toLowerCase() === username.toLowerCase());
    if (matchesUser && client.passwordHash) return client.passwordHash === await sha256(password);
    if (username.toLowerCase() === 'demo' || username.toLowerCase() === 'demo@atlantic.edu') return password === 'Demo123*';
    return false;
  }

  loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitButton.disabled) return;
    submitButton.textContent = 'VALIDANDO...';
    const ok = await authenticate(userInput.value.trim(), passwordInput.value);
    await wait(300);
    if (!ok) {
      loginMessage.textContent = 'Usuario o contraseña incorrectos.';
      loginMessage.className = 'form-message error';
      submitButton.textContent = 'INICIAR SESIÓN';
      return;
    }
    if (!localStorage.getItem('acClient')) saveClient(DEFAULT_CLIENT);
    setSession($('#rememberSession').checked);
    loginMessage.textContent = 'Ingreso correcto.';
    loginMessage.className = 'form-message success';
    await wait(350);
    closeLogin();
    renderSession();
    openDrawer();
    submitButton.textContent = 'INICIAR SESIÓN';
    passwordInput.value = '';
    validateLogin();
    showToast('Sesión iniciada correctamente');
  });

  $$('.open-login').forEach(button => button.addEventListener('click', openLogin));
  $('.login-close').addEventListener('click', closeLogin);
  overlay.addEventListener('click', event => { if (event.target === overlay) closeLogin(); });
  userInput.addEventListener('input', validateLogin);
  passwordInput.addEventListener('input', validateLogin);
  $('.toggle-password').addEventListener('click', event => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    event.currentTarget.textContent = passwordInput.type === 'password' ? '◉' : '◎';
  });

  $('.account-trigger').addEventListener('click', openDrawer);
  $('.drawer-close').addEventListener('click', closeDrawer);
  clientBackdrop.addEventListener('click', closeDrawer);
  $$('.open-deposit').forEach(button => button.addEventListener('click', openDeposit));
  $('.deposit-close').addEventListener('click', closeDeposit);
  depositOverlay.addEventListener('click', event => { if (event.target === depositOverlay) closeDeposit(); });
  $('.client-modal-close').addEventListener('click', closeClientModal);
  clientModalOverlay.addEventListener('click', event => { if (event.target === clientModalOverlay) closeClientModal(); });

  $('.notification-trigger').addEventListener('click', () => openClientModal('Notificaciones', '<div class="empty-state">🔔<h3>No tienes notificaciones pendientes</h3><p>Las alertas del cliente aparecerán en esta sección.</p></div>'));
  $('#refreshBalance').addEventListener('click', () => { renderClient(); showToast('Saldos actualizados'); });
  $('.logout-button').addEventListener('click', () => { clearSession(); closeDrawer(); renderSession(); showToast('Sesión cerrada'); });

  $('.verify-trigger').addEventListener('click', () => openClientModal('Verificación de identidad', `
    <div class="verification-panel"><div class="big-icon">🪪</div><h3>Verifica tu identidad</h3><p>En el sistema real se validaría el documento y una fotografía. Para la exposición, presiona el botón para simular la aprobación.</p><button class="btn btn-gold simulate-verification" type="button">SIMULAR VERIFICACIÓN</button></div>`));

  clientModalOverlay.addEventListener('click', event => {
    if (event.target.closest('.simulate-verification')) {
      const client = readClient(); client.verified = true; saveClient(client); closeClientModal(); renderClient(); showToast('Identidad verificada en modo demo');
    }
    if (event.target.closest('.confirm-withdraw')) {
      const input = $('#withdrawAmount'); const amount = Number(input.value); const client = readClient();
      if (!amount || amount <= 0 || amount > Number(client.balances.withdrawable || 0)) return $('.withdraw-message').textContent = 'Ingresa un monto válido.';
      client.balances.withdrawable -= amount; client.balances.cash = Math.max(0, client.balances.cash - amount);
      client.history.unshift({ type: 'Retiro demo', amount: -amount, date: new Date().toLocaleString('es-PE') }); saveClient(client); closeClientModal(); renderClient(); showToast('Retiro simulado correctamente');
    }
  });

  $('.withdraw-trigger').addEventListener('click', () => {
    const client = readClient();
    openClientModal('Retirar saldo', `<div class="transaction-form"><p>Saldo retirable: <b>${money(client.balances.withdrawable)}</b></p><label>Monto a retirar (S/)<input id="withdrawAmount" type="number" min="1" max="${client.balances.withdrawable}" step="0.01"></label><button class="btn btn-gold confirm-withdraw" type="button">CONFIRMAR RETIRO DEMO</button><p class="withdraw-message"></p></div>`);
  });

  $$('[data-client-view]').forEach(button => button.addEventListener('click', () => {
    const client = readClient();
    const view = button.dataset.clientView;
    if (view === 'balances') openClientModal('Saldos y retiros', `<div class="account-cards"><article><span>Saldo efectivo</span><b>${money(client.balances.cash)}</b></article><article><span>Saldo retirable</span><b>${money(client.balances.withdrawable)}</b></article><article><span>Bonos</span><b>${money(client.balances.bonus)}</b></article></div>`);
    if (view === 'bonuses') openClientModal('Mis bonos', `<div class="list-panel">${client.bonuses.map(item => `<article><b>${item.name}</b><span>${money(item.amount)}</span><small>${item.status}</small></article>`).join('')}</div>`);
    if (view === 'profile') openClientModal('Perfil', `<div class="profile-grid"><label>Nombres<input value="${client.names || ''}" disabled></label><label>Usuario<input value="${client.username || ''}" disabled></label><label>Correo<input value="${client.email || ''}" disabled></label><label>Celular<input value="${client.phone || ''}" disabled></label><label>Documento<input value="${client.document || ''}" disabled></label><label>Identidad<input value="${client.verified ? 'Verificada' : 'Pendiente'}" disabled></label></div>`);
    if (view === 'history') openClientModal('Historial', client.history.length ? `<div class="history-list">${client.history.map(item => `<article><span>${item.type}<small>${item.date}</small></span><b class="${item.amount >= 0 ? 'positive' : 'negative'}">${item.amount >= 0 ? '+' : ''}${money(item.amount)}</b></article>`).join('')}</div>` : '<div class="empty-state">📑<h3>Aún no hay movimientos</h3><p>Los depósitos y retiros simulados aparecerán aquí.</p></div>');
    if (view === 'help') openClientModal('Centro de ayuda', '<div class="help-grid"><button>💬 Chat de ayuda</button><button>📧 Correo de soporte</button><button>❓ Preguntas frecuentes</button><button>🔐 Seguridad de cuenta</button></div>');
  }));

  $$('.payment-method').forEach(method => method.addEventListener('click', () => {
    selectedMethod = { name: method.dataset.method, min: Number(method.dataset.min), max: Number(method.dataset.max) };
    $('.payment-methods').hidden = true;
    $('.deposit-step').hidden = false;
    $('#selectedMethod').textContent = selectedMethod.name;
    $('#methodRange').textContent = `Monto permitido en la demo: ${money(selectedMethod.min)} a ${money(selectedMethod.max)}`;
    $('#depositAmount').min = selectedMethod.min;
    $('#depositAmount').max = selectedMethod.max;
    $('#depositAmount').value = selectedMethod.min;
    $('#depositAmount').focus();
  }));
  $('.deposit-back').addEventListener('click', () => { $('.payment-methods').hidden = false; $('.deposit-step').hidden = true; });
  $('.deposit-step').addEventListener('submit', event => {
    event.preventDefault();
    const amount = Number($('#depositAmount').value);
    if (!selectedMethod || amount < selectedMethod.min || amount > selectedMethod.max) return $('.deposit-message').textContent = 'El monto no se encuentra dentro del rango permitido.';
    const client = readClient();
    client.balances = client.balances || { cash: 0, withdrawable: 0, bonus: 0 };
    client.balances.cash += amount;
    client.balances.withdrawable += amount;
    client.history = client.history || [];
    client.history.unshift({ type: `Depósito demo · ${selectedMethod.name}`, amount, date: new Date().toLocaleString('es-PE') });
    saveClient(client);
    $('.deposit-message').textContent = 'Depósito simulado correctamente.';
    setTimeout(() => { closeDeposit(); renderClient(); openDrawer(); showToast(`Se agregaron ${money(amount)} en modo demo`); }, 600);
  });

  const sideMenu = $('.side-menu'); const menuBackdrop = $('.menu-backdrop');
  function showMenu() { sideMenu.classList.add('open'); sideMenu.setAttribute('aria-hidden', 'false'); menuBackdrop.classList.add('show'); }
  function hideMenu() { sideMenu.classList.remove('open'); sideMenu.setAttribute('aria-hidden', 'true'); menuBackdrop.classList.remove('show'); }
  $('.menu-trigger').addEventListener('click', showMenu); $('.close-menu').addEventListener('click', hideMenu); menuBackdrop.addEventListener('click', hideMenu);

  const promoTrack = $('.promo-track');
  $('.carousel-next').addEventListener('click', () => promoTrack.scrollBy({ left: promoTrack.clientWidth * .72, behavior: 'smooth' }));
  $('.carousel-prev').addEventListener('click', () => promoTrack.scrollBy({ left: -promoTrack.clientWidth * .72, behavior: 'smooth' }));
  $('.games-next').addEventListener('click', () => $('.games-grid').scrollBy({ left: 420, behavior: 'smooth' }));
  $('.games-prev').addEventListener('click', () => $('.games-grid').scrollBy({ left: -420, behavior: 'smooth' }));
  $('.see-more').addEventListener('click', event => { $('.games-grid').classList.toggle('expanded'); event.currentTarget.textContent = $('.games-grid').classList.contains('expanded') ? 'VER MENOS' : 'VER MÁS'; });

  function filterGames() {
    const query = $('#gameSearch').value.trim().toLowerCase(); let visible = 0;
    $$('.game-card').forEach(card => {
      const categoryMatch = activeCategory === 'all' || card.dataset.category.split(' ').includes(activeCategory);
      const searchMatch = card.dataset.name.toLowerCase().includes(query);
      card.hidden = !(categoryMatch && searchMatch); if (!card.hidden) visible++;
    });
    $('.empty-games').hidden = visible > 0;
  }
  $$('.category').forEach(button => button.addEventListener('click', () => { $$('.category').forEach(item => item.classList.remove('active')); button.classList.add('active'); activeCategory = button.dataset.category; filterGames(); }));
  $('#gameSearch').addEventListener('input', filterGames);
  $$('[data-filter]').forEach(link => link.addEventListener('click', () => { activeCategory = link.dataset.filter; const target = $(`.category[data-category="${activeCategory}"]`); if (target) target.click(); else filterGames(); hideMenu(); }));
  $$('.game-card').forEach(card => card.addEventListener('click', () => showToast(`${card.dataset.name}: vista de demostración`)));

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeLogin(); closeDrawer(); closeDeposit(); closeClientModal(); hideMenu();
  });

  renderSession();
  const params = new URLSearchParams(location.search);
  if (params.get('login') === '1' || location.hash === '#login') openLogin();
})();

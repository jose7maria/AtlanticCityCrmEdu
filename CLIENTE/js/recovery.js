(() => {
  'use strict';
  const input = document.querySelector('#recoveryEmail');
  const button = document.querySelector('#recoveryForm button');
  const form = document.querySelector('#recoveryForm');
  const message = document.querySelector('.recovery-message');
  function validate() { const valid = input.validity.valid && input.value.trim(); button.disabled = !valid; button.classList.toggle('enabled', !!valid); }
  input.addEventListener('input', validate);
  form.addEventListener('submit', event => {
    event.preventDefault(); if (button.disabled) return;
    sessionStorage.setItem('acRecoveryEmail', input.value.trim());
    message.textContent = 'Correo validado. Abriendo el formulario para crear la nueva contraseña...';
    button.textContent = 'CONTINUANDO...'; button.disabled = true;
    setTimeout(() => location.href = 'crear-contrasena.html', 700);
  });
})();

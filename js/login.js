// ==========================================
// 1. BASE DE DATOS DE USUARIOS (MOCK DATA)
// ==========================================
const usuarios = [
  {
    id_usuario: 1,
    id_empleado: 101,
    nombre_usuario: 'admin.general',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Administrador General',
    role: 'ADMINISTRADOR',
    roleKey: 'admin',
    area: 'Administración General',
    page: 'pages/admin/index.html'
  },
  {
    id_usuario: 2,
    id_empleado: 102,
    nombre_usuario: 'maria.torres',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'María Torres',
    role: 'SERVICIO_CLIENTE',
    roleKey: 'servicio',
    area: 'Servicio al Cliente',
    page: 'pages/servicio/index.html'
  },
  {
    id_usuario: 3,
    id_empleado: 103,
    nombre_usuario: 'diego.salazar',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Diego Salazar',
    role: 'MARKETING',
    roleKey: 'marketing',
    area: 'Marketing',
    page: 'pages/marketing/index.html'
  },
  {
    id_usuario: 4,
    id_empleado: 104,
    nombre_usuario: 'lucia.ramirez',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Lucía Ramírez',
    role: 'OPERACIONES',
    roleKey: 'operaciones',
    area: 'Operaciones',
    page: 'pages/operaciones/index.html'
  },
  {
    id_usuario: 5,
    id_empleado: 105,
    nombre_usuario: 'carlos.mendoza',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Carlos Mendoza',
    role: 'RECURSOS_HUMANOS',
    roleKey: 'rrhh',
    area: 'Recursos Humanos',
    page: 'pages/rrhh/index.html'
  },
  {
    id_usuario: 6,
    id_empleado: 106,
    nombre_usuario: 'andrea.paredes',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Andrea Paredes',
    role: 'TECNOLOGIA_INFORMACION',
    roleKey: 'ti',
    area: 'Tecnología de la Información',
    page: 'pages/ti/index.html'
  },
  {
    id_usuario: 7,
    id_empleado: 107,
    nombre_usuario: 'fernando.ruiz',
    contrasena: '123456',
    estado: 'ACTIVO',
    name: 'Fernando Ruiz',
    role: 'DESARROLLO_NEGOCIOS',
    roleKey: 'negocios',
    area: 'Desarrollo de Negocios',
    page: 'pages/negocios/index.html'
  },
  {
    id_usuario: 8,
    id_empleado: 108,
    nombre_usuario: 'pedro.salas',
    contrasena: '123456',
    estado: 'INACTIVO',
    name: 'Pedro Salas',
    role: 'OPERACIONES',
    roleKey: 'operaciones',
    area: 'Operaciones',
    page: 'pages/operaciones/index.html'
  }
];

// ==========================================
// 2. REFERENCIAS A ELEMENTOS DEL DOM
// ==========================================
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const remember = document.getElementById('rememberUsername');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const alertBox = document.getElementById('loginAlert');
const loginButton = document.getElementById('loginButton');
const togglePassword = document.getElementById('togglePassword');
const openModalButton = document.getElementById('openAccessModal');
const closeModalButton = document.getElementById('closeAccessModal');
const modal = document.getElementById('accessModal');
const accessList = document.getElementById('accessList');
const forgotPassword = document.getElementById('forgotPassword');
const toast = document.getElementById('toast');

// ==========================================
// 3. FUNCIONES DE UTILIDAD
// ==========================================

// Limpia espacios y pasa a minúsculas
const clean = v => v.trim().toLowerCase();

// Muestra una notificación tipo toast
function toastMsg(m) {
  toast.textContent = m;
  toast.classList.add('visible');

  clearTimeout(toastMsg.t);

  toastMsg.t = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

// Limpia errores del formulario
function clearErrors() {
  username.classList.remove('invalid');
  password.classList.remove('invalid');

  usernameError.textContent = '';
  passwordError.textContent = '';

  alertBox.textContent = '';
  alertBox.classList.remove('visible');
}

// Valida campos vacíos
function validate() {
  let ok = true;

  clearErrors();

  if (!clean(username.value)) {
    username.classList.add('invalid');
    usernameError.textContent = 'Ingresa el nombre de usuario.';
    ok = false;
  }

  if (!password.value.trim()) {
    password.classList.add('invalid');
    passwordError.textContent = 'Ingresa la contraseña.';
    ok = false;
  }

  return ok;
}

// Guarda sesión activa mockeada
function saveSession(u) {
  const sessionData = {
    id_usuario: u.id_usuario,
    id_empleado: u.id_empleado,
    nombre_usuario: u.nombre_usuario,
    name: u.name,
    role: u.role,
    roleKey: u.roleKey,
    area: u.area,
    page: u.page,
    estado: u.estado,
    startedAt: new Date().toISOString()
  };

  // Sesión principal del proyecto
  localStorage.setItem('atlanticCitySession', JSON.stringify(sessionData));

  // Compatibilidad con el CRM interno que estamos armando
  localStorage.setItem('rolTrabajador', u.roleKey);
  localStorage.setItem('nombreTrabajador', u.name);
  localStorage.setItem('usuarioTrabajador', u.nombre_usuario);
  localStorage.setItem('areaTrabajador', u.area);

  if (remember.checked) {
    localStorage.setItem('atlanticCityRememberedUsername', u.nombre_usuario);
  } else {
    localStorage.removeItem('atlanticCityRememberedUsername');
  }
}

// Renderiza accesos temporales
function render() {
  accessList.innerHTML = usuarios
    .map(
      u => `
      <article class="access-item">
        <div>
          <strong>${u.area}</strong>
          <span>${u.nombre_usuario}</span>
          <span class="demo-status ${
            u.estado === 'ACTIVO' ? 'demo-status-active' : 'demo-status-inactive'
          }">${u.estado}</span>
        </div>

        <button 
          type="button" 
          data-username="${u.nombre_usuario}">
          ${u.estado === 'ACTIVO' ? 'Usar este acceso' : 'Probar validación'}
        </button>
      </article>`
    )
    .join('');
}

// Abre modal
function openM() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// Cierra modal
function closeM() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ==========================================
// 4. EVENTOS
// ==========================================

// Procesar login
form.onsubmit = e => {
  e.preventDefault();

  if (!validate()) return;

  const nombre = clean(username.value);
  const pass = password.value.trim();

  const u = usuarios.find(x => x.nombre_usuario === nombre);

  if (!u) {
    alertBox.textContent = 'El nombre de usuario no se encuentra registrado.';
    alertBox.classList.add('visible');
    return;
  }

  if (u.contrasena !== pass) {
    alertBox.textContent = 'La contraseña ingresada no es correcta.';
    alertBox.classList.add('visible');
    return;
  }

  if (u.estado !== 'ACTIVO') {
    alertBox.textContent =
      'El usuario se encuentra inactivo. Comunícate con Recursos Humanos o TI.';
    alertBox.classList.add('visible');
    return;
  }

  loginButton.classList.add('loading');
  loginButton.querySelector('span').textContent = 'VERIFICANDO ACCESO...';

  setTimeout(() => {
    saveSession(u);
    window.location.href = u.page;
  }, 450);
};

// Ver / ocultar contraseña
togglePassword.onclick = () => {
  const show = password.type === 'password';

  password.type = show ? 'text' : 'password';

  togglePassword.setAttribute(
    'aria-label',
    show ? 'Ocultar contraseña' : 'Mostrar contraseña'
  );
};

// Abrir modal
openModalButton.onclick = openM;

// Cerrar modal
closeModalButton.onclick = closeM;

// Cerrar modal dando clic fuera
modal.onclick = e => {
  if (e.target === modal) {
    closeM();
  }
};

// Selección de acceso desde modal
accessList.onclick = e => {
  const b = e.target.closest('[data-username]');

  if (!b) return;

  const u = usuarios.find(x => x.nombre_usuario === b.dataset.username);

  if (!u) return;

  username.value = u.nombre_usuario;
  password.value = '123456';
  remember.checked = true;

  clearErrors();
  closeM();

  toastMsg(
    u.estado === 'ACTIVO'
      ? 'Datos de acceso colocados. Presiona INICIAR SESIÓN.'
      : 'Acceso inactivo colocado para demostrar la validación.'
  );
};

// Link de recuperación
forgotPassword.onclick = () => {
  toastMsg('La recuperación debe solicitarse a Recursos Humanos o TI.');
};

// Limpiar errores al escribir
username.oninput = clearErrors;
password.oninput = clearErrors;

// Cerrar modal con tecla ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) {
    closeM();
  }
});

// ==========================================
// 5. INICIALIZACIÓN
// ==========================================
const remembered = localStorage.getItem('atlanticCityRememberedUsername');

if (remembered) {
  username.value = remembered;
  remember.checked = true;
}

render();
/* =========================================================
   ATLANTIC CITY CRM INTERNO
   Archivo: interno.js
   Datos mockeados y acciones del panel interno
   ========================================================= */


/* =========================================================
   PASO 1: DATOS MOCKEADOS
   Estos datos simulan información que luego vendría desde SQL Server.
   ========================================================= */

const clientes = [
    {
        id: 1,
        nombre: "Carlos Ramírez",
        dni: "45678912",
        telefono: "987654321",
        correo: "carlos.ramirez@gmail.com",
        categoria: "VIP",
        segmento: "Alto gasto",
        preferencia: "Ruleta",
        canal: "WhatsApp",
        ultimaVisita: "Hoy 08:45 p.m.",
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "Ana Torres",
        dni: "74258963",
        telefono: "912345678",
        correo: "ana.torres@gmail.com",
        categoria: "Frecuente",
        segmento: "Cliente frecuente",
        preferencia: "Tragamonedas",
        canal: "Email",
        ultimaVisita: "Ayer 09:20 p.m.",
        estado: "Activo"
    },
    {
        id: 3,
        nombre: "Luis Gómez",
        dni: "65897412",
        telefono: "998877665",
        correo: "luis.gomez@gmail.com",
        categoria: "Nuevo",
        segmento: "Nuevo cliente",
        preferencia: "Blackjack",
        canal: "SMS",
        ultimaVisita: "02/08/2026",
        estado: "Activo"
    },
    {
        id: 4,
        nombre: "María Fernández",
        dni: "48596712",
        telefono: "955444333",
        correo: "maria.fernandez@gmail.com",
        categoria: "VIP",
        segmento: "Promociones premium",
        preferencia: "Poker",
        canal: "WhatsApp",
        ultimaVisita: "Hoy 07:15 p.m.",
        estado: "Activo"
    },
    {
        id: 5,
        nombre: "Jorge Salazar",
        dni: "78965412",
        telefono: "966333222",
        correo: "jorge.salazar@gmail.com",
        categoria: "Inactivo",
        segmento: "Recuperación",
        preferencia: "Apuestas deportivas",
        canal: "Email",
        ultimaVisita: "15/07/2026",
        estado: "Inactivo"
    }
];

const visitas = [
    { id: 1, cliente: "Carlos Ramírez", fecha: "Hoy", hora: "08:45 p.m.", estado: "En sala" },
    { id: 2, cliente: "María Fernández", fecha: "Hoy", hora: "07:15 p.m.", estado: "En sala" },
    { id: 3, cliente: "Ana Torres", fecha: "Ayer", hora: "09:20 p.m.", estado: "Finalizada" }
];

const promociones = [
    {
        id: 1,
        nombre: "Bono cumpleaños",
        segmento: "Clientes VIP",
        canal: "WhatsApp",
        estado: "Enviado",
        efectividad: "78%"
    },
    {
        id: 2,
        nombre: "Noche de ruleta",
        segmento: "Clientes frecuentes",
        canal: "Email",
        estado: "Programado",
        efectividad: "64%"
    },
    {
        id: 3,
        nombre: "Recuperación de clientes",
        segmento: "Clientes inactivos",
        canal: "SMS",
        estado: "Pendiente",
        efectividad: "41%"
    }
];

const incidencias = [
    {
        id: 1,
        cliente: "Luis Gómez",
        tipo: "Reclamo",
        descripcion: "Promoción no aplicada",
        estado: "Pendiente",
        responsable: "Servicio al Cliente"
    },
    {
        id: 2,
        cliente: "Ana Torres",
        tipo: "Consulta",
        descripcion: "Información sobre bono activo",
        estado: "En proceso",
        responsable: "Marketing"
    },
    {
        id: 3,
        cliente: "Carlos Ramírez",
        tipo: "Solicitud",
        descripcion: "Actualización de datos de contacto",
        estado: "Resuelto",
        responsable: "Atención al Cliente"
    }
];

const alertas = [
    {
        titulo: "Cliente VIP en sala",
        detalle: "Carlos Ramírez acaba de registrar visita.",
        tipo: "vip"
    },
    {
        titulo: "Incidencia pendiente",
        detalle: "Reclamo por promoción no aplicada.",
        tipo: "danger"
    },
    {
        titulo: "Promoción programada",
        detalle: "Campaña Noche de ruleta lista para envío.",
        tipo: "warning"
    },
    {
        titulo: "Reporte actualizado",
        detalle: "Indicadores de clientes activos disponibles.",
        tipo: "blue"
    }
];


/* =========================================================
   PASO 2: FUNCIÓN PARA CAMBIAR SECCIONES DEL MENÚ
   ========================================================= */

const botonesMenu = document.querySelectorAll(".menu-item");
const secciones = document.querySelectorAll(".section");
const tituloPrincipal = document.querySelector(".topbar h1");

botonesMenu.forEach(boton => {
    boton.addEventListener("click", () => {

        botonesMenu.forEach(item => item.classList.remove("active"));
        boton.classList.add("active");

        secciones.forEach(section => section.classList.remove("active-section"));

        const nombreSeccion = boton.getAttribute("data-section");
        const seccionActiva = document.getElementById(nombreSeccion);

        if (seccionActiva) {
            seccionActiva.classList.add("active-section");
        }

        tituloPrincipal.textContent = boton.textContent;
    });
});


/* =========================================================
   PASO 3: CARGAR INDICADORES DEL DASHBOARD
   ========================================================= */

function cargarIndicadores() {
    const totalClientes = clientes.length;
    const clientesVip = clientes.filter(cliente => cliente.categoria === "VIP").length;
    const visitasHoy = visitas.filter(visita => visita.fecha === "Hoy").length;
    const promosEnviadas = promociones.filter(promo => promo.estado === "Enviado").length;
    const incidenciasPendientes = incidencias.filter(inc => inc.estado === "Pendiente").length;

    document.getElementById("totalClientes").textContent = totalClientes;
    document.getElementById("clientesVip").textContent = clientesVip;
    document.getElementById("visitasHoy").textContent = visitasHoy;
    document.getElementById("promosEnviadas").textContent = promosEnviadas;
    document.getElementById("incidenciasPendientes").textContent = incidenciasPendientes;
}


/* =========================================================
   PASO 4: MOSTRAR CLIENTES RECIENTES
   ========================================================= */

function cargarClientesRecientes() {
    const contenedor = document.getElementById("clientesRecientes");
    contenedor.innerHTML = "";

    clientes.slice(0, 4).forEach(cliente => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        item.innerHTML = `
            <div>
                <strong>${cliente.nombre}</strong>
                <span>${cliente.categoria} · ${cliente.ultimaVisita}</span>
            </div>
            <span class="badge ${cliente.categoria === "VIP" ? "vip" : "blue"}">${cliente.estado}</span>
        `;

        contenedor.appendChild(item);
    });
}


/* =========================================================
   PASO 5: MOSTRAR ALERTAS RECIENTES
   ========================================================= */

function cargarAlertasRecientes() {
    const contenedor = document.getElementById("alertasRecientes");
    contenedor.innerHTML = "";

    alertas.forEach(alerta => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        item.innerHTML = `
            <div>
                <strong>${alerta.titulo}</strong>
                <span>${alerta.detalle}</span>
            </div>
            <span class="badge ${alerta.tipo}">Alerta</span>
        `;

        contenedor.appendChild(item);
    });
}


/* =========================================================
   PASO 6: MOSTRAR PROMOCIONES DESTACADAS
   ========================================================= */

function cargarPromocionesDestacadas() {
    const contenedor = document.getElementById("promocionesDestacadas");
    contenedor.innerHTML = "";

    promociones.forEach(promo => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        let claseBadge = "blue";

        if (promo.estado === "Enviado") {
            claseBadge = "success";
        } else if (promo.estado === "Programado") {
            claseBadge = "warning";
        } else {
            claseBadge = "danger";
        }

        item.innerHTML = `
            <div>
                <strong>${promo.nombre}</strong>
                <span>${promo.segmento} · ${promo.canal} · Efectividad ${promo.efectividad}</span>
            </div>
            <span class="badge ${claseBadge}">${promo.estado}</span>
        `;

        contenedor.appendChild(item);
    });
}


/* =========================================================
   PASO 7: MOSTRAR INCIDENCIAS RECIENTES
   ========================================================= */

function cargarIncidenciasRecientes() {
    const contenedor = document.getElementById("incidenciasRecientes");
    contenedor.innerHTML = "";

    incidencias.forEach(incidencia => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        let claseBadge = "blue";

        if (incidencia.estado === "Pendiente") {
            claseBadge = "danger";
        } else if (incidencia.estado === "En proceso") {
            claseBadge = "warning";
        } else {
            claseBadge = "success";
        }

        item.innerHTML = `
            <div>
                <strong>${incidencia.cliente}</strong>
                <span>${incidencia.tipo}: ${incidencia.descripcion}</span>
            </div>
            <span class="badge ${claseBadge}">${incidencia.estado}</span>
        `;

        contenedor.appendChild(item);
    });
}


/* =========================================================
   PASO 8: BOTÓN CERRAR SESIÓN MOCKEADO
   ========================================================= */

const botonCerrarSesion = document.querySelector(".logout");

botonCerrarSesion.addEventListener("click", () => {
    const confirmar = confirm("¿Deseas cerrar sesión del panel interno?");

    if (confirmar) {
        alert("Sesión cerrada correctamente. Esta acción está mockeada.");
    }
});


/* =========================================================
   PASO 9: INICIAR EL DASHBOARD
   ========================================================= */

function iniciarDashboard() {
    cargarIndicadores();
    cargarClientesRecientes();
    cargarAlertasRecientes();
    cargarPromocionesDestacadas();
    cargarIncidenciasRecientes();
}

iniciarDashboard();


/* =========================================================
   PASO 10: MÓDULO GESTIÓN DE CLIENTES
   ========================================================= */

const tablaClientes = document.getElementById("tablaClientes");
const buscarCliente = document.getElementById("buscarCliente");
const filtroCategoria = document.getElementById("filtroCategoria");
const btnNuevoCliente = document.getElementById("btnNuevoCliente");

function obtenerClaseCategoria(categoria) {
    if (categoria === "VIP") return "vip";
    if (categoria === "Frecuente") return "success";
    if (categoria === "Nuevo") return "blue";
    if (categoria === "Inactivo") return "danger";
    return "blue";
}

function cargarTablaClientes(listaClientes = clientes) {
    tablaClientes.innerHTML = "";

    if (listaClientes.length === 0) {
        tablaClientes.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron clientes con ese criterio.
                </td>
            </tr>
        `;
        return;
    }

    listaClientes.forEach(cliente => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${cliente.nombre}</strong>
                    <span>${cliente.correo}</span>
                </div>
            </td>
            <td>${cliente.dni}</td>
            <td>${cliente.telefono}</td>
            <td>
                <span class="badge ${obtenerClaseCategoria(cliente.categoria)}">
                    ${cliente.categoria}
                </span>
            </td>
            <td>${cliente.segmento}</td>
            <td>${cliente.ultimaVisita}</td>
            <td>
                <span class="badge ${cliente.estado === "Activo" ? "success" : "danger"}">
                    ${cliente.estado}
                </span>
            </td>
            <td>
                <div class="actions">
                    <button class="btn-action btn-view" onclick="verPerfilCliente(${cliente.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="editarClienteMock(${cliente.id})">Editar</button>
                    <button class="btn-action btn-delete" onclick="eliminarClienteMock(${cliente.id})">Eliminar</button>
                </div>
            </td>
        `;

        tablaClientes.appendChild(fila);
    });
}

function filtrarClientes() {
    const texto = buscarCliente.value.toLowerCase();
    const categoria = filtroCategoria.value;

    const clientesFiltrados = clientes.filter(cliente => {
        const coincideTexto =
            cliente.nombre.toLowerCase().includes(texto) ||
            cliente.dni.includes(texto) ||
            cliente.correo.toLowerCase().includes(texto);

        const coincideCategoria =
            categoria === "Todos" || cliente.categoria === categoria;

        return coincideTexto && coincideCategoria;
    });

    cargarTablaClientes(clientesFiltrados);
}

buscarCliente.addEventListener("input", filtrarClientes);
filtroCategoria.addEventListener("change", filtrarClientes);

btnNuevoCliente.addEventListener("click", () => {
    alert("Acción mockeada: aquí se abriría el formulario para registrar un nuevo cliente.");
});


/* =========================================================
   PASO 11: PERFIL 360° DEL CLIENTE
   ========================================================= */

function verPerfilCliente(idCliente) {
    const cliente = clientes.find(item => item.id === idCliente);

    if (!cliente) {
        alert("Cliente no encontrado.");
        return;
    }

    const contenido = document.getElementById("perfilClienteContenido");

    contenido.classList.remove("perfil-empty");

    contenido.innerHTML = `
        <div class="perfil-grid">

            <div class="perfil-card">
                <h3>Datos generales del cliente</h3>

                <div class="info-row">
                    <span>Nombre completo</span>
                    <strong>${cliente.nombre}</strong>
                </div>

                <div class="info-row">
                    <span>DNI</span>
                    <strong>${cliente.dni}</strong>
                </div>

                <div class="info-row">
                    <span>Teléfono</span>
                    <strong>${cliente.telefono}</strong>
                </div>

                <div class="info-row">
                    <span>Correo</span>
                    <strong>${cliente.correo}</strong>
                </div>

                <div class="info-row">
                    <span>Categoría</span>
                    <strong>${cliente.categoria}</strong>
                </div>

                <div class="info-row">
                    <span>Segmento</span>
                    <strong>${cliente.segmento}</strong>
                </div>

                <div class="info-row">
                    <span>Estado</span>
                    <strong>${cliente.estado}</strong>
                </div>
            </div>

            <div class="perfil-card">
                <h3>Preferencias del cliente</h3>

                <div class="info-row">
                    <span>Juego preferido</span>
                    <strong>${cliente.preferencia}</strong>
                </div>

                <div class="info-row">
                    <span>Canal preferido</span>
                    <strong>${cliente.canal}</strong>
                </div>

                <div class="info-row">
                    <span>Última visita</span>
                    <strong>${cliente.ultimaVisita}</strong>
                </div>

                <div class="info-row">
                    <span>Recibe promociones</span>
                    <strong>Sí</strong>
                </div>
            </div>

            <div class="perfil-card">
                <h3>Interacciones previas</h3>

                <div class="timeline">
                    <div class="timeline-item">
                        <strong>Comunicación por ${cliente.canal}</strong>
                        <span>Seguimiento de promoción personalizada.</span>
                    </div>

                    <div class="timeline-item">
                        <strong>Actualización de datos</strong>
                        <span>Validación de teléfono y correo del cliente.</span>
                    </div>

                    <div class="timeline-item">
                        <strong>Registro de visita</strong>
                        <span>Última visita registrada: ${cliente.ultimaVisita}.</span>
                    </div>
                </div>
            </div>

            <div class="perfil-card">
                <h3>Promociones e incidencias</h3>

                <div class="timeline">
                    <div class="timeline-item">
                        <strong>Promoción sugerida</strong>
                        <span>Oferta personalizada según preferencia: ${cliente.preferencia}.</span>
                    </div>

                    <div class="timeline-item">
                        <strong>Segmentación</strong>
                        <span>Cliente pertenece al segmento: ${cliente.segmento}.</span>
                    </div>

                    <div class="timeline-item">
                        <strong>Estado de atención</strong>
                        <span>No presenta incidencias críticas abiertas.</span>
                    </div>
                </div>
            </div>

        </div>
    `;

    cambiarASeccionPerfil();
}

function cambiarASeccionPerfil() {
    botonesMenu.forEach(item => item.classList.remove("active"));
    secciones.forEach(section => section.classList.remove("active-section"));

    const botonPerfil = document.querySelector('.menu-item[data-section="perfil"]');
    const seccionPerfil = document.getElementById("perfil");

    if (botonPerfil) {
        botonPerfil.classList.add("active");
    }

    if (seccionPerfil) {
        seccionPerfil.classList.add("active-section");
    }

    tituloPrincipal.textContent = "Perfil 360°";
}


/* =========================================================
   PASO 12: ACCIONES MOCKEADAS
   ========================================================= */

function editarClienteMock(idCliente) {
    const cliente = clientes.find(item => item.id === idCliente);

    if (!cliente) {
        alert("Cliente no encontrado.");
        return;
    }

    alert(`Acción mockeada: aquí se editarían los datos de ${cliente.nombre}.`);
}

function eliminarClienteMock(idCliente) {
    const cliente = clientes.find(item => item.id === idCliente);

    if (!cliente) {
        alert("Cliente no encontrado.");
        return;
    }

    const confirmar = confirm(`¿Deseas eliminar a ${cliente.nombre}?`);

    if (confirmar) {
        const posicion = clientes.findIndex(item => item.id === idCliente);

        if (posicion !== -1) {
            clientes.splice(posicion, 1);
        }

        cargarTablaClientes();
        cargarIndicadores();
        cargarClientesRecientes();

        alert("Cliente eliminado correctamente. Esta acción está mockeada.");
    }
}


/* =========================================================
   PASO 13: INICIAR MÓDULO CLIENTES
   ========================================================= */

function iniciarModuloClientes() {
    cargarTablaClientes();
}

iniciarModuloClientes();


/* =========================================================
   PASO 14: MÓDULO SEGMENTACIÓN DE CLIENTES
   Este módulo simula la segmentación según visitas, gasto,
   preferencias y promociones anteriores.
   ========================================================= */

const metricasSegmentacion = [
    {
        idCliente: 1,
        frecuencia: "Alta",
        visitasMes: 12,
        nivelGasto: "Alto",
        gastoEstimado: "S/ 2,850",
        promocionesUsadas: 5,
        riesgo: "Bajo",
        accion: "Mantener beneficios VIP"
    },
    {
        idCliente: 2,
        frecuencia: "Media",
        visitasMes: 7,
        nivelGasto: "Medio",
        gastoEstimado: "S/ 1,120",
        promocionesUsadas: 3,
        riesgo: "Bajo",
        accion: "Enviar promoción personalizada"
    },
    {
        idCliente: 3,
        frecuencia: "Baja",
        visitasMes: 2,
        nivelGasto: "Bajo",
        gastoEstimado: "S/ 240",
        promocionesUsadas: 1,
        riesgo: "Medio",
        accion: "Campaña de bienvenida"
    },
    {
        idCliente: 4,
        frecuencia: "Alta",
        visitasMes: 10,
        nivelGasto: "Alto",
        gastoEstimado: "S/ 3,400",
        promocionesUsadas: 6,
        riesgo: "Bajo",
        accion: "Promoción premium"
    },
    {
        idCliente: 5,
        frecuencia: "Muy baja",
        visitasMes: 0,
        nivelGasto: "Bajo",
        gastoEstimado: "S/ 0",
        promocionesUsadas: 0,
        riesgo: "Alto",
        accion: "Campaña de recuperación"
    }
];

const tablaSegmentacion = document.getElementById("tablaSegmentacion");
const buscarSegmentacion = document.getElementById("buscarSegmentacion");
const filtroSegmento = document.getElementById("filtroSegmento");
const filtroPreferencia = document.getElementById("filtroPreferencia");
const btnGenerarSegmentos = document.getElementById("btnGenerarSegmentos");

function obtenerClientePorId(idCliente) {
    return clientes.find(cliente => cliente.id === idCliente);
}

function obtenerClaseRiesgo(riesgo) {
    if (riesgo === "Alto") return "danger";
    if (riesgo === "Medio") return "warning";
    return "success";
}

function obtenerClaseGasto(nivelGasto) {
    if (nivelGasto === "Alto") return "vip";
    if (nivelGasto === "Medio") return "warning";
    return "blue";
}

function cargarResumenSegmentacion() {
    const totalVip = clientes.filter(cliente => cliente.categoria === "VIP").length;

    const totalFrecuentes = metricasSegmentacion.filter(item =>
        item.frecuencia === "Alta" || item.frecuencia === "Media"
    ).length;

    const totalAltoGasto = metricasSegmentacion.filter(item =>
        item.nivelGasto === "Alto"
    ).length;

    const totalInactivos = clientes.filter(cliente =>
        cliente.categoria === "Inactivo" || cliente.estado === "Inactivo"
    ).length;

    document.getElementById("segVip").textContent = totalVip;
    document.getElementById("segFrecuentes").textContent = totalFrecuentes;
    document.getElementById("segAltoGasto").textContent = totalAltoGasto;
    document.getElementById("segInactivos").textContent = totalInactivos;
}

function cargarTablaSegmentacion(listaMetricas = metricasSegmentacion) {
    tablaSegmentacion.innerHTML = "";

    if (listaMetricas.length === 0) {
        tablaSegmentacion.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron clientes para esta segmentación.
                </td>
            </tr>
        `;
        return;
    }

    listaMetricas.forEach(item => {
        const cliente = obtenerClientePorId(item.idCliente);

        if (!cliente) {
            return;
        }

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${cliente.nombre}</strong>
                    <span>${cliente.correo}</span>
                </div>
            </td>

            <td>
                <span class="badge ${obtenerClaseCategoria(cliente.categoria)}">
                    ${cliente.segmento}
                </span>
            </td>

            <td>
                ${item.frecuencia}<br>
                <span style="color: var(--text-muted); font-size: 12px;">
                    ${item.visitasMes} visitas/mes
                </span>
            </td>

            <td>
                <span class="badge ${obtenerClaseGasto(item.nivelGasto)}">
                    ${item.nivelGasto}
                </span>
                <br>
                <span style="color: var(--text-muted); font-size: 12px;">
                    ${item.gastoEstimado}
                </span>
            </td>

            <td>${cliente.preferencia}</td>

            <td>${item.promocionesUsadas}</td>

            <td>
                <span class="badge ${obtenerClaseRiesgo(item.riesgo)}">
                    ${item.riesgo}
                </span>
            </td>

            <td>
                <button class="btn-action btn-view" onclick="crearPromocionDesdeSegmento(${cliente.id})">
                    ${item.accion}
                </button>
            </td>
        `;

        tablaSegmentacion.appendChild(fila);
    });
}

function filtrarSegmentacion() {
    const texto = buscarSegmentacion.value.toLowerCase();
    const segmento = filtroSegmento.value;
    const preferencia = filtroPreferencia.value;

    const resultado = metricasSegmentacion.filter(item => {
        const cliente = obtenerClientePorId(item.idCliente);

        if (!cliente) {
            return false;
        }

        const coincideTexto =
            cliente.nombre.toLowerCase().includes(texto) ||
            cliente.segmento.toLowerCase().includes(texto) ||
            cliente.preferencia.toLowerCase().includes(texto);

        const coincideSegmento =
            segmento === "Todos" || cliente.segmento === segmento;

        const coincidePreferencia =
            preferencia === "Todos" || cliente.preferencia === preferencia;

        return coincideTexto && coincideSegmento && coincidePreferencia;
    });

    cargarTablaSegmentacion(resultado);
}

buscarSegmentacion.addEventListener("input", filtrarSegmentacion);
filtroSegmento.addEventListener("change", filtrarSegmentacion);
filtroPreferencia.addEventListener("change", filtrarSegmentacion);

btnGenerarSegmentos.addEventListener("click", () => {
    alert("Segmentación generada correctamente. Esta acción está mockeada con datos simulados.");
});

function crearPromocionDesdeSegmento(idCliente) {
    const cliente = obtenerClientePorId(idCliente);

    if (!cliente) {
        alert("Cliente no encontrado.");
        return;
    }

    alert(`Acción mockeada: se generaría una promoción personalizada para ${cliente.nombre}, según su segmento: ${cliente.segmento}.`);
}

function iniciarModuloSegmentacion() {
    cargarResumenSegmentacion();
    cargarTablaSegmentacion();
}

iniciarModuloSegmentacion();


/* =========================================================
   PASO 15: MÓDULO PROMOCIONES PERSONALIZADAS
   Este módulo simula campañas y promociones según segmento,
   canal de contacto y efectividad.
   ========================================================= */

const objetivosPromociones = {
    "Bono cumpleaños": "Fidelizar clientes VIP con beneficios personalizados.",
    "Noche de ruleta": "Aumentar la participación de clientes frecuentes.",
    "Recuperación de clientes": "Reactivar clientes inactivos mediante incentivos."
};

const tablaPromociones = document.getElementById("tablaPromociones");
const buscarPromocion = document.getElementById("buscarPromocion");
const filtroEstadoPromo = document.getElementById("filtroEstadoPromo");
const filtroCanalPromo = document.getElementById("filtroCanalPromo");
const btnNuevaPromocion = document.getElementById("btnNuevaPromocion");

function obtenerClaseEstadoPromocion(estado) {
    if (estado === "Enviado") return "success";
    if (estado === "Programado") return "warning";
    if (estado === "Pendiente") return "danger";
    return "blue";
}

function convertirPorcentaje(valor) {
    return parseInt(valor.replace("%", ""));
}

function cargarResumenPromociones() {
    const total = promociones.length;
    const enviadas = promociones.filter(promo => promo.estado === "Enviado").length;
    const programadas = promociones.filter(promo => promo.estado === "Programado").length;
    const pendientes = promociones.filter(promo => promo.estado === "Pendiente").length;

    document.getElementById("promoTotal").textContent = total;
    document.getElementById("promoEnviadas").textContent = enviadas;
    document.getElementById("promoProgramadas").textContent = programadas;
    document.getElementById("promoPendientes").textContent = pendientes;
}

function cargarTablaPromociones(listaPromociones = promociones) {
    tablaPromociones.innerHTML = "";

    if (listaPromociones.length === 0) {
        tablaPromociones.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron promociones con ese criterio.
                </td>
            </tr>
        `;
        return;
    }

    listaPromociones.forEach(promo => {
        const fila = document.createElement("tr");
        const efectividadNumero = convertirPorcentaje(promo.efectividad);
        const objetivo = objetivosPromociones[promo.nombre] || "Promoción personalizada según comportamiento del cliente.";

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${promo.nombre}</strong>
                    <span>ID promoción: ${promo.id}</span>
                </div>
            </td>

            <td>${promo.segmento}</td>

            <td>
                <span class="badge blue">${promo.canal}</span>
            </td>

            <td>
                <span class="badge ${obtenerClaseEstadoPromocion(promo.estado)}">
                    ${promo.estado}
                </span>
            </td>

            <td>
                <strong>${promo.efectividad}</strong>
                <div class="effect-bar">
                    <div class="effect-fill" style="width: ${efectividadNumero}%;"></div>
                </div>
            </td>

            <td>
                <div class="promo-objective">${objetivo}</div>
            </td>

            <td>
                <div class="actions">
                    <button class="btn-action btn-view" onclick="verDetallePromocion(${promo.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="programarEnvioPromocion(${promo.id})">Programar</button>
                    <button class="btn-action btn-delete" onclick="pausarPromocion(${promo.id})">Pausar</button>
                </div>
            </td>
        `;

        tablaPromociones.appendChild(fila);
    });
}

function filtrarPromociones() {
    const texto = buscarPromocion.value.toLowerCase();
    const estado = filtroEstadoPromo.value;
    const canal = filtroCanalPromo.value;

    const resultado = promociones.filter(promo => {
        const coincideTexto =
            promo.nombre.toLowerCase().includes(texto) ||
            promo.segmento.toLowerCase().includes(texto) ||
            promo.canal.toLowerCase().includes(texto);

        const coincideEstado =
            estado === "Todos" || promo.estado === estado;

        const coincideCanal =
            canal === "Todos" || promo.canal === canal;

        return coincideTexto && coincideEstado && coincideCanal;
    });

    cargarTablaPromociones(resultado);
}

buscarPromocion.addEventListener("input", filtrarPromociones);
filtroEstadoPromo.addEventListener("change", filtrarPromociones);
filtroCanalPromo.addEventListener("change", filtrarPromociones);

btnNuevaPromocion.addEventListener("click", () => {
    const nuevaPromo = {
        id: promociones.length + 1,
        nombre: "Campaña personalizada",
        segmento: "Clientes frecuentes",
        canal: "WhatsApp",
        estado: "Pendiente",
        efectividad: "0%"
    };

    promociones.push(nuevaPromo);

    cargarResumenPromociones();
    cargarTablaPromociones();
    cargarIndicadores();
    cargarPromocionesDestacadas();

    alert("Promoción creada correctamente. Esta acción está mockeada.");
});

function verDetallePromocion(idPromocion) {
    const promo = promociones.find(item => item.id === idPromocion);

    if (!promo) {
        alert("Promoción no encontrada.");
        return;
    }

    alert(
        `Detalle de promoción:\n\n` +
        `Nombre: ${promo.nombre}\n` +
        `Segmento: ${promo.segmento}\n` +
        `Canal: ${promo.canal}\n` +
        `Estado: ${promo.estado}\n` +
        `Efectividad: ${promo.efectividad}\n\n` +
        `Esta vista está mockeada.`
    );
}

function programarEnvioPromocion(idPromocion) {
    const promo = promociones.find(item => item.id === idPromocion);

    if (!promo) {
        alert("Promoción no encontrada.");
        return;
    }

    promo.estado = "Programado";

    cargarResumenPromociones();
    cargarTablaPromociones();
    cargarPromocionesDestacadas();

    alert(`Promoción "${promo.nombre}" programada correctamente. Acción mockeada.`);
}

function pausarPromocion(idPromocion) {
    const promo = promociones.find(item => item.id === idPromocion);

    if (!promo) {
        alert("Promoción no encontrada.");
        return;
    }

    const confirmar = confirm(`¿Deseas pausar la promoción "${promo.nombre}"?`);

    if (confirmar) {
        promo.estado = "Pendiente";

        cargarResumenPromociones();
        cargarTablaPromociones();
        cargarPromocionesDestacadas();

        alert("Promoción pausada correctamente. Acción mockeada.");
    }
}

function iniciarModuloPromociones() {
    cargarResumenPromociones();
    cargarTablaPromociones();
}

iniciarModuloPromociones();



/* =========================================================
   PASO 16: MÓDULO ATENCIÓN AL CLIENTE / INCIDENCIAS
   ========================================================= */

const solucionesIncidencias = {
    1: "Pendiente de validación con el área de Marketing.",
    2: "Se está revisando el bono activo del cliente.",
    3: "Datos actualizados correctamente en el perfil del cliente."
};

const tablaIncidencias = document.getElementById("tablaIncidencias");
const buscarIncidencia = document.getElementById("buscarIncidencia");
const filtroEstadoIncidencia = document.getElementById("filtroEstadoIncidencia");
const filtroTipoIncidencia = document.getElementById("filtroTipoIncidencia");
const btnNuevaIncidencia = document.getElementById("btnNuevaIncidencia");

function obtenerClaseEstadoIncidencia(estado) {
    if (estado === "Pendiente") return "danger";
    if (estado === "En proceso") return "warning";
    if (estado === "Resuelto") return "success";
    return "blue";
}

function cargarResumenIncidencias() {
    const pendientes = incidencias.filter(item => item.estado === "Pendiente").length;
    const proceso = incidencias.filter(item => item.estado === "En proceso").length;
    const resueltas = incidencias.filter(item => item.estado === "Resuelto").length;
    const total = incidencias.length;

    document.getElementById("incPendientes").textContent = pendientes;
    document.getElementById("incProceso").textContent = proceso;
    document.getElementById("incResueltas").textContent = resueltas;
    document.getElementById("incTotal").textContent = total;
}

function cargarTablaIncidencias(listaIncidencias = incidencias) {
    tablaIncidencias.innerHTML = "";

    if (listaIncidencias.length === 0) {
        tablaIncidencias.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron incidencias con ese criterio.
                </td>
            </tr>
        `;
        return;
    }

    listaIncidencias.forEach(incidencia => {
        const fila = document.createElement("tr");
        const solucion = solucionesIncidencias[incidencia.id] || "Sin solución registrada.";

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${incidencia.cliente}</strong>
                    <span>ID incidencia: ${incidencia.id}</span>
                </div>
            </td>

            <td>
                <span class="badge blue">${incidencia.tipo}</span>
            </td>

            <td>
                <div class="incidence-desc">${incidencia.descripcion}</div>
            </td>

            <td>
                <span class="badge ${obtenerClaseEstadoIncidencia(incidencia.estado)}">
                    ${incidencia.estado}
                </span>
            </td>

            <td>${incidencia.responsable}</td>

            <td>
                <div class="solution-text">${solucion}</div>
            </td>

            <td>
                <div class="actions">
                    <button class="btn-action btn-view" onclick="verDetalleIncidencia(${incidencia.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="cambiarEstadoIncidencia(${incidencia.id})">Cambiar estado</button>
                    <button class="btn-action btn-delete" onclick="cerrarIncidencia(${incidencia.id})">Cerrar</button>
                </div>
            </td>
        `;

        tablaIncidencias.appendChild(fila);
    });
}

function filtrarIncidencias() {
    const texto = buscarIncidencia.value.toLowerCase();
    const estado = filtroEstadoIncidencia.value;
    const tipo = filtroTipoIncidencia.value;

    const resultado = incidencias.filter(incidencia => {
        const coincideTexto =
            incidencia.cliente.toLowerCase().includes(texto) ||
            incidencia.tipo.toLowerCase().includes(texto) ||
            incidencia.descripcion.toLowerCase().includes(texto) ||
            incidencia.responsable.toLowerCase().includes(texto);

        const coincideEstado =
            estado === "Todos" || incidencia.estado === estado;

        const coincideTipo =
            tipo === "Todos" || incidencia.tipo === tipo;

        return coincideTexto && coincideEstado && coincideTipo;
    });

    cargarTablaIncidencias(resultado);
}

buscarIncidencia.addEventListener("input", filtrarIncidencias);
filtroEstadoIncidencia.addEventListener("change", filtrarIncidencias);
filtroTipoIncidencia.addEventListener("change", filtrarIncidencias);

btnNuevaIncidencia.addEventListener("click", () => {
    const nuevaIncidencia = {
        id: incidencias.length + 1,
        cliente: "María Fernández",
        tipo: "Solicitud",
        descripcion: "Solicitud de atención personalizada para cliente VIP",
        estado: "Pendiente",
        responsable: "Servicio al Cliente"
    };

    incidencias.push(nuevaIncidencia);
    solucionesIncidencias[nuevaIncidencia.id] = "Pendiente de asignación de solución.";

    cargarResumenIncidencias();
    cargarTablaIncidencias();
    cargarIndicadores();
    cargarIncidenciasRecientes();

    alert("Incidencia registrada correctamente. Acción mockeada.");
});

function verDetalleIncidencia(idIncidencia) {
    const incidencia = incidencias.find(item => item.id === idIncidencia);

    if (!incidencia) {
        alert("Incidencia no encontrada.");
        return;
    }

    const solucion = solucionesIncidencias[incidencia.id] || "Sin solución registrada.";

    alert(
        `Detalle de incidencia:\n\n` +
        `Cliente: ${incidencia.cliente}\n` +
        `Tipo: ${incidencia.tipo}\n` +
        `Descripción: ${incidencia.descripcion}\n` +
        `Estado: ${incidencia.estado}\n` +
        `Responsable: ${incidencia.responsable}\n` +
        `Solución: ${solucion}\n\n` +
        `Esta acción está mockeada.`
    );
}

function cambiarEstadoIncidencia(idIncidencia) {
    const incidencia = incidencias.find(item => item.id === idIncidencia);

    if (!incidencia) {
        alert("Incidencia no encontrada.");
        return;
    }

    if (incidencia.estado === "Pendiente") {
        incidencia.estado = "En proceso";
        solucionesIncidencias[idIncidencia] = "Caso derivado al área responsable.";
    } else if (incidencia.estado === "En proceso") {
        incidencia.estado = "Resuelto";
        solucionesIncidencias[idIncidencia] = "Incidencia atendida y solución registrada.";
    } else {
        incidencia.estado = "Pendiente";
        solucionesIncidencias[idIncidencia] = "Caso reabierto para nueva revisión.";
    }

    cargarResumenIncidencias();
    cargarTablaIncidencias();
    cargarIndicadores();
    cargarIncidenciasRecientes();

    alert("Estado actualizado correctamente. Acción mockeada.");
}

function cerrarIncidencia(idIncidencia) {
    const incidencia = incidencias.find(item => item.id === idIncidencia);

    if (!incidencia) {
        alert("Incidencia no encontrada.");
        return;
    }

    const confirmar = confirm(`¿Deseas cerrar la incidencia de ${incidencia.cliente}?`);

    if (confirmar) {
        incidencia.estado = "Resuelto";
        solucionesIncidencias[idIncidencia] = "Caso cerrado con solución registrada.";

        cargarResumenIncidencias();
        cargarTablaIncidencias();
        cargarIndicadores();
        cargarIncidenciasRecientes();

        alert("Incidencia cerrada correctamente. Acción mockeada.");
    }
}

function iniciarModuloIncidencias() {
    cargarResumenIncidencias();
    cargarTablaIncidencias();
}

iniciarModuloIncidencias();

/* =========================================================
   PASO 17: MÓDULO REPORTES / INDICADORES
   ========================================================= */

const btnGenerarReporte = document.getElementById("btnGenerarReporte");

function obtenerNumeroPorcentaje(valor) {
    return parseInt(valor.replace("%", ""));
}

function cargarResumenReportes() {
    const clientesActivos = clientes.filter(cliente => cliente.estado === "Activo").length;

    const promoMasEfectiva = Math.max(
        ...promociones.map(promo => obtenerNumeroPorcentaje(promo.efectividad))
    );

    const incidenciasAbiertas = incidencias.filter(item =>
        item.estado === "Pendiente" || item.estado === "En proceso"
    ).length;

    const visitasActualesHoy = visitas.filter(visita => visita.fecha === "Hoy").length;

    document.getElementById("repClientesActivos").textContent = clientesActivos;
    document.getElementById("repPromoEfectiva").textContent = promoMasEfectiva + "%";
    document.getElementById("repIncidenciasAbiertas").textContent = incidenciasAbiertas;
    document.getElementById("repVisitasHoy").textContent = visitasActualesHoy;
}

function crearBarra(contenedor, nombre, valor, total) {
    const porcentaje = total > 0 ? Math.round((valor / total) * 100) : 0;

    const item = document.createElement("div");
    item.classList.add("bar-item");

    item.innerHTML = `
        <div class="bar-info">
            <span>${nombre}</span>
            <strong>${valor} (${porcentaje}%)</strong>
        </div>

        <div class="bar-track">
            <div class="bar-fill" style="width: ${porcentaje}%;"></div>
        </div>
    `;

    contenedor.appendChild(item);
}

function cargarGraficoCategorias() {
    const contenedor = document.getElementById("graficoCategorias");
    contenedor.innerHTML = "";

    const total = clientes.length;

    const vip = clientes.filter(cliente => cliente.categoria === "VIP").length;
    const frecuentes = clientes.filter(cliente => cliente.categoria === "Frecuente").length;
    const nuevos = clientes.filter(cliente => cliente.categoria === "Nuevo").length;
    const inactivos = clientes.filter(cliente => cliente.categoria === "Inactivo").length;

    crearBarra(contenedor, "VIP", vip, total);
    crearBarra(contenedor, "Frecuente", frecuentes, total);
    crearBarra(contenedor, "Nuevo", nuevos, total);
    crearBarra(contenedor, "Inactivo", inactivos, total);
}

function cargarGraficoPromociones() {
    const contenedor = document.getElementById("graficoPromociones");
    contenedor.innerHTML = "";

    promociones.forEach(promo => {
        const porcentaje = obtenerNumeroPorcentaje(promo.efectividad);

        const item = document.createElement("div");
        item.classList.add("bar-item");

        item.innerHTML = `
            <div class="bar-info">
                <span>${promo.nombre}</span>
                <strong>${promo.efectividad}</strong>
            </div>

            <div class="bar-track">
                <div class="bar-fill" style="width: ${porcentaje}%;"></div>
            </div>
        `;

        contenedor.appendChild(item);
    });
}

function cargarGraficoIncidencias() {
    const contenedor = document.getElementById("graficoIncidencias");
    contenedor.innerHTML = "";

    const total = incidencias.length;

    const pendientes = incidencias.filter(item => item.estado === "Pendiente").length;
    const proceso = incidencias.filter(item => item.estado === "En proceso").length;
    const resueltos = incidencias.filter(item => item.estado === "Resuelto").length;

    crearBarra(contenedor, "Pendiente", pendientes, total);
    crearBarra(contenedor, "En proceso", proceso, total);
    crearBarra(contenedor, "Resuelto", resueltos, total);
}

function cargarClientesMasActivos() {
    const contenedor = document.getElementById("clientesMasActivos");
    contenedor.innerHTML = "";

    const ranking = metricasSegmentacion
        .slice()
        .sort((a, b) => b.visitasMes - a.visitasMes)
        .slice(0, 4);

    ranking.forEach(item => {
        const cliente = obtenerClientePorId(item.idCliente);

        if (!cliente) {
            return;
        }

        const fila = document.createElement("div");
        fila.classList.add("list-item");

        fila.innerHTML = `
            <div>
                <strong>${cliente.nombre}</strong>
                <span>${item.visitasMes} visitas/mes · ${item.gastoEstimado}</span>
            </div>

            <span class="badge ${obtenerClaseCategoria(cliente.categoria)}">
                ${cliente.categoria}
            </span>
        `;

        contenedor.appendChild(fila);
    });
}

btnGenerarReporte.addEventListener("click", () => {
    cargarResumenReportes();
    cargarGraficoCategorias();
    cargarGraficoPromociones();
    cargarGraficoIncidencias();
    cargarClientesMasActivos();

    alert("Reporte generado correctamente. Acción mockeada.");
});

function iniciarModuloReportes() {
    cargarResumenReportes();
    cargarGraficoCategorias();
    cargarGraficoPromociones();
    cargarGraficoIncidencias();
    cargarClientesMasActivos();
}

iniciarModuloReportes();

/* =========================================================
   PASO 18: MÓDULO AUTOMATIZACIÓN / ALERTAS
   ========================================================= */

const tareasProgramadas = [
    {
        id: 1,
        nombre: "Envío de promoción VIP",
        descripcion: "Enviar bono personalizado a clientes VIP activos.",
        tipo: "Promoción",
        frecuencia: "Semanal",
        proximaEjecucion: "09/08/2026 10:00 a.m.",
        estado: "Programada",
        responsable: "Marketing"
    },
    {
        id: 2,
        nombre: "Reporte de clientes activos",
        descripcion: "Generar reporte de clientes con mayor frecuencia de visitas.",
        tipo: "Reporte",
        frecuencia: "Diaria",
        proximaEjecucion: "06/08/2026 08:00 a.m.",
        estado: "Activa",
        responsable: "Desarrollo de Negocios"
    },
    {
        id: 3,
        nombre: "Alerta de incidencia crítica",
        descripcion: "Notificar incidencias pendientes con más de 24 horas.",
        tipo: "Alerta",
        frecuencia: "Cada hora",
        proximaEjecucion: "Hoy 09:00 p.m.",
        estado: "Activa",
        responsable: "Servicio al Cliente"
    },
    {
        id: 4,
        nombre: "Seguimiento de cliente inactivo",
        descripcion: "Programar contacto para clientes sin visitas recientes.",
        tipo: "Seguimiento",
        frecuencia: "Mensual",
        proximaEjecucion: "15/08/2026 11:30 a.m.",
        estado: "Pendiente",
        responsable: "Marketing"
    },
    {
        id: 5,
        nombre: "Backup de información CRM",
        descripcion: "Registrar respaldo automático de información del sistema.",
        tipo: "Reporte",
        frecuencia: "Diaria",
        proximaEjecucion: "06/08/2026 02:00 a.m.",
        estado: "Ejecutada",
        responsable: "TI"
    }
];

const tablaTareas = document.getElementById("tablaTareas");
const buscarTarea = document.getElementById("buscarTarea");
const filtroTipoTarea = document.getElementById("filtroTipoTarea");
const filtroEstadoTarea = document.getElementById("filtroEstadoTarea");
const btnNuevaTarea = document.getElementById("btnNuevaTarea");

function obtenerClaseEstadoTarea(estado) {
    if (estado === "Programada") return "warning";
    if (estado === "Activa") return "success";
    if (estado === "Pendiente") return "danger";
    if (estado === "Ejecutada") return "blue";
    return "blue";
}

function obtenerClaseTipoTarea(tipo) {
    if (tipo === "Promoción") return "vip";
    if (tipo === "Reporte") return "blue";
    if (tipo === "Alerta") return "danger";
    if (tipo === "Seguimiento") return "warning";
    return "blue";
}

function cargarResumenAutomatizacion() {
    const totalTareas = tareasProgramadas.length;
    const alertasActivas = tareasProgramadas.filter(item =>
        item.tipo === "Alerta" && item.estado === "Activa"
    ).length;

    const reportes = tareasProgramadas.filter(item =>
        item.tipo === "Reporte"
    ).length;

    const seguimientos = tareasProgramadas.filter(item =>
        item.tipo === "Seguimiento"
    ).length;

    document.getElementById("autoTareas").textContent = totalTareas;
    document.getElementById("autoAlertas").textContent = alertasActivas;
    document.getElementById("autoReportes").textContent = reportes;
    document.getElementById("autoSeguimientos").textContent = seguimientos;
}

function cargarTablaTareas(listaTareas = tareasProgramadas) {
    tablaTareas.innerHTML = "";

    if (listaTareas.length === 0) {
        tablaTareas.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron tareas con ese criterio.
                </td>
            </tr>
        `;
        return;
    }

    listaTareas.forEach(tarea => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${tarea.nombre}</strong>
                    <div class="task-description">${tarea.descripcion}</div>
                </div>
            </td>

            <td>
                <span class="badge ${obtenerClaseTipoTarea(tarea.tipo)}">
                    ${tarea.tipo}
                </span>
            </td>

            <td>
                <span class="frequency-text">${tarea.frecuencia}</span>
            </td>

            <td>
                <span class="next-date">${tarea.proximaEjecucion}</span>
            </td>

            <td>
                <span class="badge ${obtenerClaseEstadoTarea(tarea.estado)}">
                    ${tarea.estado}
                </span>
            </td>

            <td>${tarea.responsable}</td>

            <td>
                <div class="actions">
                    <button class="btn-action btn-view" onclick="verDetalleTarea(${tarea.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="ejecutarTarea(${tarea.id})">Ejecutar</button>
                    <button class="btn-action btn-delete" onclick="pausarTarea(${tarea.id})">Pausar</button>
                </div>
            </td>
        `;

        tablaTareas.appendChild(fila);
    });
}

function filtrarTareas() {
    const texto = buscarTarea.value.toLowerCase();
    const tipo = filtroTipoTarea.value;
    const estado = filtroEstadoTarea.value;

    const resultado = tareasProgramadas.filter(tarea => {
        const coincideTexto =
            tarea.nombre.toLowerCase().includes(texto) ||
            tarea.descripcion.toLowerCase().includes(texto) ||
            tarea.tipo.toLowerCase().includes(texto) ||
            tarea.responsable.toLowerCase().includes(texto);

        const coincideTipo =
            tipo === "Todos" || tarea.tipo === tipo;

        const coincideEstado =
            estado === "Todos" || tarea.estado === estado;

        return coincideTexto && coincideTipo && coincideEstado;
    });

    cargarTablaTareas(resultado);
}

buscarTarea.addEventListener("input", filtrarTareas);
filtroTipoTarea.addEventListener("change", filtrarTareas);
filtroEstadoTarea.addEventListener("change", filtrarTareas);

btnNuevaTarea.addEventListener("click", () => {
    const nuevaTarea = {
        id: tareasProgramadas.length + 1,
        nombre: "Nueva automatización CRM",
        descripcion: "Tarea creada para simular automatización de procesos internos.",
        tipo: "Seguimiento",
        frecuencia: "Semanal",
        proximaEjecucion: "12/08/2026 09:00 a.m.",
        estado: "Pendiente",
        responsable: "TI"
    };

    tareasProgramadas.push(nuevaTarea);

    cargarResumenAutomatizacion();
    cargarTablaTareas();

    alert("Tarea programada creada correctamente. Acción mockeada.");
});

function verDetalleTarea(idTarea) {
    const tarea = tareasProgramadas.find(item => item.id === idTarea);

    if (!tarea) {
        alert("Tarea no encontrada.");
        return;
    }

    alert(
        `Detalle de tarea:\n\n` +
        `Nombre: ${tarea.nombre}\n` +
        `Tipo: ${tarea.tipo}\n` +
        `Frecuencia: ${tarea.frecuencia}\n` +
        `Próxima ejecución: ${tarea.proximaEjecucion}\n` +
        `Estado: ${tarea.estado}\n` +
        `Responsable: ${tarea.responsable}\n\n` +
        `Descripción: ${tarea.descripcion}\n\n` +
        `Esta acción está mockeada.`
    );
}

function ejecutarTarea(idTarea) {
    const tarea = tareasProgramadas.find(item => item.id === idTarea);

    if (!tarea) {
        alert("Tarea no encontrada.");
        return;
    }

    tarea.estado = "Ejecutada";

    cargarResumenAutomatizacion();
    cargarTablaTareas();

    alert(`Tarea "${tarea.nombre}" ejecutada correctamente. Acción mockeada.`);
}

function pausarTarea(idTarea) {
    const tarea = tareasProgramadas.find(item => item.id === idTarea);

    if (!tarea) {
        alert("Tarea no encontrada.");
        return;
    }

    const confirmar = confirm(`¿Deseas pausar la tarea "${tarea.nombre}"?`);

    if (confirmar) {
        tarea.estado = "Pendiente";

        cargarResumenAutomatizacion();
        cargarTablaTareas();

        alert("Tarea pausada correctamente. Acción mockeada.");
    }
}

function iniciarModuloAutomatizacion() {
    cargarResumenAutomatizacion();
    cargarTablaTareas();
}

iniciarModuloAutomatizacion();


/* =========================================================
   PASO 19: MÓDULO USUARIOS / ROLES
   ========================================================= */

const usuariosInternos = [
    {
        id: 1,
        nombre: "Roberto Salinas",
        correo: "roberto.salinas@atlanticcity.com",
        gerencia: "TI",
        rol: "Administrador TI",
        permisos: ["Usuarios", "Roles", "Auditoría", "Reportes"],
        estado: "Activo"
    },
    {
        id: 2,
        nombre: "Lucía Mendoza",
        correo: "lucia.mendoza@atlanticcity.com",
        gerencia: "Marketing",
        rol: "Marketing",
        permisos: ["Segmentación", "Promociones", "Campañas"],
        estado: "Activo"
    },
    {
        id: 3,
        nombre: "Marco Ruiz",
        correo: "marco.ruiz@atlanticcity.com",
        gerencia: "Servicio al Cliente",
        rol: "Servicio al Cliente",
        permisos: ["Clientes", "Perfil 360", "Incidencias"],
        estado: "Activo"
    },
    {
        id: 4,
        nombre: "Patricia León",
        correo: "patricia.leon@atlanticcity.com",
        gerencia: "Operaciones",
        rol: "Operaciones",
        permisos: ["Visitas", "Reservas", "Check-in VIP"],
        estado: "Activo"
    },
    {
        id: 5,
        nombre: "Sofía Herrera",
        correo: "sofia.herrera@atlanticcity.com",
        gerencia: "Recursos Humanos",
        rol: "Recursos Humanos",
        permisos: ["Usuarios", "Capacitaciones"],
        estado: "Inactivo"
    },
    {
        id: 6,
        nombre: "Daniel Vega",
        correo: "daniel.vega@atlanticcity.com",
        gerencia: "Desarrollo de Negocios",
        rol: "Desarrollo de Negocios",
        permisos: ["Reportes", "Indicadores", "Dashboard"],
        estado: "Activo"
    }
];

const tablaUsuarios = document.getElementById("tablaUsuarios");
const buscarUsuario = document.getElementById("buscarUsuario");
const filtroRolUsuario = document.getElementById("filtroRolUsuario");
const filtroEstadoUsuario = document.getElementById("filtroEstadoUsuario");
const btnNuevoUsuario = document.getElementById("btnNuevoUsuario");

function obtenerClaseRolUsuario(rol) {
    if (rol === "Administrador TI") return "vip";
    if (rol === "Marketing") return "warning";
    if (rol === "Servicio al Cliente") return "blue";
    if (rol === "Operaciones") return "success";
    if (rol === "Recursos Humanos") return "blue";
    if (rol === "Desarrollo de Negocios") return "vip";
    return "blue";
}

function cargarResumenUsuarios() {
    const total = usuariosInternos.length;
    const activos = usuariosInternos.filter(usuario => usuario.estado === "Activo").length;
    const inactivos = usuariosInternos.filter(usuario => usuario.estado === "Inactivo").length;

    const gerenciasUnicas = new Set(
        usuariosInternos.map(usuario => usuario.gerencia)
    ).size;

    document.getElementById("usuTotal").textContent = total;
    document.getElementById("usuActivos").textContent = activos;
    document.getElementById("usuGerencias").textContent = gerenciasUnicas;
    document.getElementById("usuInactivos").textContent = inactivos;
}

function cargarTablaUsuarios(listaUsuarios = usuariosInternos) {
    tablaUsuarios.innerHTML = "";

    if (listaUsuarios.length === 0) {
        tablaUsuarios.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; color: var(--text-muted); padding: 25px;">
                    No se encontraron usuarios con ese criterio.
                </td>
            </tr>
        `;
        return;
    }

    listaUsuarios.forEach(usuario => {
        const fila = document.createElement("tr");

        const permisosHTML = usuario.permisos.map(permiso => {
            return `<span class="permission-tag">${permiso}</span>`;
        }).join("");

        fila.innerHTML = `
            <td>
                <div class="client-name">
                    <strong>${usuario.nombre}</strong>
                    <span>ID usuario: ${usuario.id}</span>
                </div>
            </td>

            <td>${usuario.correo}</td>

            <td>${usuario.gerencia}</td>

            <td>
                <span class="badge ${obtenerClaseRolUsuario(usuario.rol)}">
                    ${usuario.rol}
                </span>
            </td>

            <td>
                <div class="permissions-list">
                    ${permisosHTML}
                </div>
            </td>

            <td>
                <span class="badge ${usuario.estado === "Activo" ? "success" : "danger"}">
                    ${usuario.estado}
                </span>
            </td>

            <td>
                <div class="actions">
                    <button class="btn-action btn-view" onclick="verDetalleUsuario(${usuario.id})">Ver</button>
                    <button class="btn-action btn-edit" onclick="editarUsuarioMock(${usuario.id})">Editar</button>
                    <button class="btn-action btn-delete" onclick="cambiarEstadoUsuario(${usuario.id})">
                        ${usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                    </button>
                </div>
            </td>
        `;

        tablaUsuarios.appendChild(fila);
    });
}

function filtrarUsuarios() {
    const texto = buscarUsuario.value.toLowerCase();
    const rol = filtroRolUsuario.value;
    const estado = filtroEstadoUsuario.value;

    const resultado = usuariosInternos.filter(usuario => {
        const permisosTexto = usuario.permisos.join(" ").toLowerCase();

        const coincideTexto =
            usuario.nombre.toLowerCase().includes(texto) ||
            usuario.correo.toLowerCase().includes(texto) ||
            usuario.gerencia.toLowerCase().includes(texto) ||
            usuario.rol.toLowerCase().includes(texto) ||
            permisosTexto.includes(texto);

        const coincideRol =
            rol === "Todos" || usuario.rol === rol;

        const coincideEstado =
            estado === "Todos" || usuario.estado === estado;

        return coincideTexto && coincideRol && coincideEstado;
    });

    cargarTablaUsuarios(resultado);
}

buscarUsuario.addEventListener("input", filtrarUsuarios);
filtroRolUsuario.addEventListener("change", filtrarUsuarios);
filtroEstadoUsuario.addEventListener("change", filtrarUsuarios);

btnNuevoUsuario.addEventListener("click", () => {
    const nuevoUsuario = {
        id: usuariosInternos.length + 1,
        nombre: "Nuevo Usuario Interno",
        correo: "nuevo.usuario@atlanticcity.com",
        gerencia: "TI",
        rol: "Administrador TI",
        permisos: ["Clientes", "Reportes"],
        estado: "Activo"
    };

    usuariosInternos.push(nuevoUsuario);

    cargarResumenUsuarios();
    cargarTablaUsuarios();

    alert("Usuario creado correctamente. Acción mockeada.");
});

function verDetalleUsuario(idUsuario) {
    const usuario = usuariosInternos.find(item => item.id === idUsuario);

    if (!usuario) {
        alert("Usuario no encontrado.");
        return;
    }

    alert(
        `Detalle de usuario:\n\n` +
        `Nombre: ${usuario.nombre}\n` +
        `Correo: ${usuario.correo}\n` +
        `Gerencia: ${usuario.gerencia}\n` +
        `Rol: ${usuario.rol}\n` +
        `Permisos: ${usuario.permisos.join(", ")}\n` +
        `Estado: ${usuario.estado}\n\n` +
        `Esta acción está mockeada.`
    );
}

function editarUsuarioMock(idUsuario) {
    const usuario = usuariosInternos.find(item => item.id === idUsuario);

    if (!usuario) {
        alert("Usuario no encontrado.");
        return;
    }

    alert(`Acción mockeada: aquí se editarían los permisos y datos de ${usuario.nombre}.`);
}

function cambiarEstadoUsuario(idUsuario) {
    const usuario = usuariosInternos.find(item => item.id === idUsuario);

    if (!usuario) {
        alert("Usuario no encontrado.");
        return;
    }

    const mensaje = usuario.estado === "Activo"
        ? `¿Deseas desactivar al usuario ${usuario.nombre}?`
        : `¿Deseas activar al usuario ${usuario.nombre}?`;

    const confirmar = confirm(mensaje);

    if (confirmar) {
        usuario.estado = usuario.estado === "Activo" ? "Inactivo" : "Activo";

        cargarResumenUsuarios();
        cargarTablaUsuarios();

        alert("Estado de usuario actualizado correctamente. Acción mockeada.");
    }
}

function iniciarModuloUsuarios() {
    cargarResumenUsuarios();
    cargarTablaUsuarios();
}

iniciarModuloUsuarios();



/* =========================================================
   PASO 20: MÓDULO PREFERENCIAS DE USUARIO INTERNO
   ========================================================= */

const preferenciasUsuario = {
    tema: "Oscuro",
    idioma: "Español",
    vistaInicial: "Dashboard",
    modo: "Normal",
    sesion: "30",
    gerencia: "TI",
    alertasCriticas: true,
    promociones: true,
    reportes: true,
    seguimientos: true,
    accesoClientes: true,
    accesoReportes: true,
    accesoIncidencias: true,
    accesoPromociones: true
};

const selectTema = document.getElementById("selectTema");
const selectModo = document.getElementById("selectModo");
const selectVistaInicial = document.getElementById("selectVistaInicial");
const selectIdioma = document.getElementById("selectIdioma");
const selectSesion = document.getElementById("selectSesion");
const selectGerencia = document.getElementById("selectGerencia");

const checkAlertasCriticas = document.getElementById("checkAlertasCriticas");
const checkPromociones = document.getElementById("checkPromociones");
const checkReportes = document.getElementById("checkReportes");
const checkSeguimientos = document.getElementById("checkSeguimientos");

const checkAccesoClientes = document.getElementById("checkAccesoClientes");
const checkAccesoReportes = document.getElementById("checkAccesoReportes");
const checkAccesoIncidencias = document.getElementById("checkAccesoIncidencias");
const checkAccesoPromociones = document.getElementById("checkAccesoPromociones");

const btnGuardarPreferencias = document.getElementById("btnGuardarPreferencias");
const btnRestablecerPreferencias = document.getElementById("btnRestablecerPreferencias");

function cargarPreferenciasEnFormulario() {
    selectTema.value = preferenciasUsuario.tema;
    selectModo.value = preferenciasUsuario.modo;
    selectVistaInicial.value = preferenciasUsuario.vistaInicial;
    selectIdioma.value = preferenciasUsuario.idioma;
    selectSesion.value = preferenciasUsuario.sesion;
    selectGerencia.value = preferenciasUsuario.gerencia;

    checkAlertasCriticas.checked = preferenciasUsuario.alertasCriticas;
    checkPromociones.checked = preferenciasUsuario.promociones;
    checkReportes.checked = preferenciasUsuario.reportes;
    checkSeguimientos.checked = preferenciasUsuario.seguimientos;

    checkAccesoClientes.checked = preferenciasUsuario.accesoClientes;
    checkAccesoReportes.checked = preferenciasUsuario.accesoReportes;
    checkAccesoIncidencias.checked = preferenciasUsuario.accesoIncidencias;
    checkAccesoPromociones.checked = preferenciasUsuario.accesoPromociones;
}

function actualizarResumenPreferencias() {
    document.getElementById("prefTema").textContent = preferenciasUsuario.tema;
    document.getElementById("prefIdioma").textContent = preferenciasUsuario.idioma === "Español" ? "ES" : "EN";
    document.getElementById("prefVista").textContent = preferenciasUsuario.vistaInicial;

    const alertasActivas = preferenciasUsuario.alertasCriticas || preferenciasUsuario.promociones || preferenciasUsuario.reportes || preferenciasUsuario.seguimientos;

    document.getElementById("prefAlertas").textContent = alertasActivas ? "Activas" : "Inactivas";
}

function aplicarTemaPreferido() {
    if (preferenciasUsuario.tema === "Claro") {
        document.body.classList.add("light-mode");
    } else {
        document.body.classList.remove("light-mode");
    }
}

function guardarPreferencias() {
    preferenciasUsuario.tema = selectTema.value;
    preferenciasUsuario.modo = selectModo.value;
    preferenciasUsuario.vistaInicial = selectVistaInicial.value;
    preferenciasUsuario.idioma = selectIdioma.value;
    preferenciasUsuario.sesion = selectSesion.value;
    preferenciasUsuario.gerencia = selectGerencia.value;

    preferenciasUsuario.alertasCriticas = checkAlertasCriticas.checked;
    preferenciasUsuario.promociones = checkPromociones.checked;
    preferenciasUsuario.reportes = checkReportes.checked;
    preferenciasUsuario.seguimientos = checkSeguimientos.checked;

    preferenciasUsuario.accesoClientes = checkAccesoClientes.checked;
    preferenciasUsuario.accesoReportes = checkAccesoReportes.checked;
    preferenciasUsuario.accesoIncidencias = checkAccesoIncidencias.checked;
    preferenciasUsuario.accesoPromociones = checkAccesoPromociones.checked;

    aplicarTemaPreferido();
    actualizarResumenPreferencias();

    alert("Preferencias guardadas correctamente. Acción mockeada.");
}

function restablecerPreferencias() {
    const confirmar = confirm("¿Deseas restablecer las preferencias del usuario interno?");

    if (!confirmar) {
        return;
    }

    preferenciasUsuario.tema = "Oscuro";
    preferenciasUsuario.idioma = "Español";
    preferenciasUsuario.vistaInicial = "Dashboard";
    preferenciasUsuario.modo = "Normal";
    preferenciasUsuario.sesion = "30";
    preferenciasUsuario.gerencia = "TI";

    preferenciasUsuario.alertasCriticas = true;
    preferenciasUsuario.promociones = true;
    preferenciasUsuario.reportes = true;
    preferenciasUsuario.seguimientos = true;

    preferenciasUsuario.accesoClientes = true;
    preferenciasUsuario.accesoReportes = true;
    preferenciasUsuario.accesoIncidencias = true;
    preferenciasUsuario.accesoPromociones = true;

    cargarPreferenciasEnFormulario();
    aplicarTemaPreferido();
    actualizarResumenPreferencias();

    alert("Preferencias restablecidas correctamente. Acción mockeada.");
}

selectTema.addEventListener("change", () => {
    preferenciasUsuario.tema = selectTema.value;
    aplicarTemaPreferido();
    actualizarResumenPreferencias();
});

btnGuardarPreferencias.addEventListener("click", guardarPreferencias);
btnRestablecerPreferencias.addEventListener("click", restablecerPreferencias);

function iniciarModuloPreferencias() {
    cargarPreferenciasEnFormulario();
    aplicarTemaPreferido();
    actualizarResumenPreferencias();
}

iniciarModuloPreferencias();
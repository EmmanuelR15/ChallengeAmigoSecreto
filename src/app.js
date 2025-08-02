// Lista para almacenar los nombres de los amigos
let amigos = [];
let sorteoRealizado = false;

// Función para agregar un amigo
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();
  input.classList.remove("input-error");
  if (nombre === "") {
    input.classList.add("input-error");
    input.focus();
    return;
  }
  if (amigos.includes(nombre)) {
    input.classList.add("input-error");
    input.value = "";
    input.focus();
    return;
  }
  if (amigos.length >= 20) {
    input.classList.add("input-error");
    input.value = "";
    input.focus();
    return;
  }
  amigos.push(nombre);
  input.value = "";
  input.focus();
  mostrarLista(true);
  document.getElementById("resultado").innerHTML = "";
  sorteoRealizado = false;
  guardarAmigos();
}

// Función para mostrar la lista de amigos con animación
function mostrarLista(animar = false) {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((amigo, idx) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    if (animar) li.classList.add("fade-in");
    // Botón eliminar
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.className = "btn-eliminar";
    btn.onclick = function () {
      li.classList.add("fade-out");
      setTimeout(() => {
        amigos.splice(idx, 1);
        mostrarLista();
        document.getElementById("resultado").innerHTML = "";
        guardarAmigos();
      }, 300);
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

// Función para sortear un amigo
function sortearAmigo() {
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  if (amigos.length === 0) {
    resultado.innerHTML = "<li>Agrega al menos un amigo para sortear.</li>";
    return;
  }
  if (sorteoRealizado) {
    resultado.innerHTML =
      "<li>Ya se realizó el sorteo. Agrega o elimina amigos para volver a sortear.</li>";
    return;
  }
  resultado.innerHTML = `<li class='sorteo-anim'>...</li>`;
  setTimeout(() => {
    const idx = Math.floor(Math.random() * amigos.length);
    resultado.innerHTML = `<li class='sorteo-anim'>El amigo secreto es: <strong>${amigos[idx]}</strong></li>`;
    sorteoRealizado = true;
  }, 900);
}
// Botón para limpiar toda la lista
function limpiarLista() {
  amigos = [];
  mostrarLista();
  document.getElementById("resultado").innerHTML = "";
  guardarAmigos();
}

// Guardar y cargar amigos en localStorage
function guardarAmigos() {
  localStorage.setItem("amigos", JSON.stringify(amigos));
}

function cargarAmigos() {
  const almacenados = localStorage.getItem("amigos");
  if (almacenados) {
    amigos = JSON.parse(almacenados);
    mostrarLista();
  }
}

// Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", cargarAmigos);

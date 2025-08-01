// Lista para almacenar los nombres de los amigos
let amigos = [];
let sorteoRealizado = false;

// Función para agregar un amigo
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();
  if (nombre === "") {
    alert("Por favor, ingresa un nombre válido.");
    return;
  }
  if (amigos.includes(nombre)) {
    alert("Ese nombre ya está en la lista.");
    input.value = "";
    input.focus();
    return;
  }
  if (amigos.length >= 20) {
    alert("Solo puedes agregar hasta 20 amigos.");
    input.value = "";
    input.focus();
    return;
  }
  amigos.push(nombre);
  input.value = "";
  input.focus();
  mostrarLista();
  document.getElementById("resultado").innerHTML = "";
  sorteoRealizado = false;
  guardarAmigos();
}

// Función para mostrar la lista de amigos
function mostrarLista() {
  const lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((amigo, idx) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    // Botón eliminar
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.className = "btn-eliminar";
    btn.onclick = function() {
      amigos.splice(idx, 1);
      mostrarLista();
      document.getElementById("resultado").innerHTML = "";
      guardarAmigos();
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
    alert("Agrega al menos un nombre antes de sortear.");
    return;
  }
  if (sorteoRealizado) {
    resultado.innerHTML = '<li>Ya se realizó el sorteo. Agrega más amigos para volver a sortear.</li>';
    return;
  }
  const indice = Math.floor(Math.random() * amigos.length);
  const nombreSorteado = amigos[indice];
  const li = document.createElement("li");
  li.textContent = `El amigo secreto es: ${nombreSorteado}`;
  li.style.fontWeight = "bold";
  li.style.color = "#007bff";
  resultado.appendChild(li);
  sorteoRealizado = true;
}

// Permitir agregar con Enter
window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("amigo");
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      agregarAmigo();
    }
  });
  cargarAmigos();
});

// Guardar y cargar amigos en localStorage
function guardarAmigos() {
  localStorage.setItem("amigos", JSON.stringify(amigos));
}
function cargarAmigos() {
  const guardados = localStorage.getItem("amigos");
  if (guardados) {
    amigos = JSON.parse(guardados);
    mostrarLista();
  }
}

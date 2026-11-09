console.log("Archivo poke.js cargado correctamente");

// Obtener elementos del DOM
const mensaje = document.getElementById("mensaje");
mensaje.innerText = "¡Hola! Escribe el nombre de un Pokémon y haz clic en Buscar.";
mensaje.style.color = "blue";
mensaje.style.fontSize = "18px";

const pokeInput = document.getElementById("pokemonInput");
const buscarBtn = document.getElementById("buscarBtn");

const nombrePoke = document.getElementById("nombrePoke");
const pokeImg = document.getElementById("pokeImg");
const tipoDePoke = document.getElementById("tipoDePoke");

// Elementos de los retos adicionales
const pagina = document.getElementById("pagina");
const cargando = document.getElementById("cargando");
const detalles = document.getElementById("detalles");
const pokeNumero = document.getElementById("pokeNumero");
const pokeAltura = document.getElementById("pokeAltura");
const pokePeso = document.getElementById("pokePeso");
const pokeHabilidades = document.getElementById("pokeHabilidades");
const pokeStats = document.getElementById("pokeStats");

// Colores de la página según el tipo de Pokémon [claro, fuerte]
const coloresPorTipo = {
    normal:   ["#e5e5d6", "#a8a77a"],
    fire:     ["#fde2c8", "#ee8130"],
    water:    ["#d4e2fb", "#6390f0"],
    electric: ["#fdf3c4", "#f7d02c"],
    grass:    ["#dcf2cf", "#7ac74c"],
    ice:      ["#dff5f4", "#96d9d6"],
    fighting: ["#f0cdcb", "#c22e28"],
    poison:   ["#ead0ea", "#a33ea1"],
    ground:   ["#f4ead0", "#e2bf65"],
    flying:   ["#e6deff", "#a98ff3"],
    psychic:  ["#fdd5e0", "#f95587"],
    bug:      ["#e8f0c0", "#a6b91a"],
    rock:     ["#ece5c8", "#b6a136"],
    ghost:    ["#ddd5e8", "#735797"],
    dragon:   ["#dccdfd", "#6f35fc"],
    dark:     ["#ddd3cc", "#705746"],
    steel:    ["#e6e6ef", "#b7b7ce"],
    fairy:    ["#f8e0ec", "#d685ad"]
};

// Nombres de tipos en español
const tiposEnEspanol = {
    normal: "normal", fire: "fuego", water: "agua", electric: "eléctrico",
    grass: "planta", ice: "hielo", fighting: "lucha", poison: "veneno",
    ground: "tierra", flying: "volador", psychic: "psíquico", bug: "bicho",
    rock: "roca", ghost: "fantasma", dragon: "dragón", dark: "siniestro",
    steel: "acero", fairy: "hada"
};

// Nombres de estadísticas en español
const statsEnEspanol = {
    "hp": "PS",
    "attack": "Ataque",
    "defense": "Defensa",
    "special-attack": "At. Especial",
    "special-defense": "Def. Especial",
    "speed": "Velocidad"
};

// Evento click
buscarBtn.addEventListener("click", () => {
    console.log("Botón de búsqueda clickeado");

    const nombrePokemon = pokeInput.value.toLowerCase().trim();

    if (!nombrePokemon) {
        mensaje.innerText = "Para buscar, escribe un nombre de Pokémon.";
        mensaje.style.color = "orange";
        alert("No colocaste ningún nombre :0");
        return;
    }

    buscarPokemon(nombrePokemon);
});

// Reto: buscar con la tecla Enter
pokeInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        buscarBtn.click();
    }
});

// Reto: mostrar / ocultar el SVG animado de "Cargando..."
function mostrarCargando(activo) {
    if (activo) {
        cargando.classList.remove("hidden");
        cargando.classList.add("flex");
        mensaje.innerText = "";
        buscarBtn.disabled = true;
        buscarBtn.classList.add("opacity-60");
    } else {
        cargando.classList.add("hidden");
        cargando.classList.remove("flex");
        buscarBtn.disabled = false;
        buscarBtn.classList.remove("opacity-60");
    }
}

// Función para consultar la API
function buscarPokemon(nombre) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    console.log(`Buscando Pokémon: ${nombre}`);
    mostrarCargando(true);

    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`${res.status}. Pokémon '${nombre}' no encontrado`);
            }
            return res.json();
        })
        .then(data => {
            mostrarPokemon(data);
        })
        .catch(error => {
            mensaje.innerText = `Error: ${error.message}`;
            mensaje.style.color = "red";
            limpiarPokemon();
        })
        .finally(() => {
            mostrarCargando(false);
        });
}

// Mostrar datos en pantalla
function mostrarPokemon(pokemon) {
    const nombre = pokemon.name;
    const imagen = pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default;
    const tiposIngles = pokemon.types.map(t => t.type.name);
    const tipos = tiposIngles.map(t => tiposEnEspanol[t] || t).join(", ");

    console.log(`Pokémon encontrado: ${nombre} - Tipos: ${tipos} - Imagen: ${imagen}`);

    mensaje.innerText = `¡Has encontrado a ${nombre}!`;
    mensaje.style.color = "green";

    nombrePoke.innerText = nombre;
    tipoDePoke.innerText = "Tipo: " + tipos;

    pokeImg.src = imagen;
    pokeImg.alt = `Imagen de ${nombre}`;

    // Reto: más características
    pokeNumero.innerText = "#" + pokemon.id;
    pokeAltura.innerText = (pokemon.height / 10) + " m";   // la API da decímetros
    pokePeso.innerText = (pokemon.weight / 10) + " kg";    // la API da hectogramos
    pokeHabilidades.innerText = pokemon.abilities.map(a => a.ability.name.replace("-", " ")).join(", ");
    mostrarStats(pokemon.stats, tiposIngles[0]);
    detalles.classList.remove("hidden");

    // Reto: cambiar el estilo de la página según el tipo
    cambiarEstiloPorTipo(tiposIngles[0]);
}

// Barras de estadísticas base
function mostrarStats(stats, tipo) {
    const color = (coloresPorTipo[tipo] || ["", "#6366f1"])[1];
    pokeStats.innerHTML = "";

    stats.forEach(s => {
        const porcentaje = Math.min(100, (s.base_stat / 200) * 100);
        const fila = document.createElement("div");
        fila.className = "flex items-center gap-2";
        fila.innerHTML = `
            <span class="w-24 text-xs text-gray-500">${statsEnEspanol[s.stat.name] || s.stat.name}</span>
            <span class="w-8 text-xs font-bold text-right">${s.base_stat}</span>
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full rounded-full" style="width: ${porcentaje}%; background: ${color};"></div>
            </div>
        `;
        pokeStats.appendChild(fila);
    });
}

function cambiarEstiloPorTipo(tipo) {
    const [claro, fuerte] = coloresPorTipo[tipo] || ["#e0e7ff", "#a5f3fc"];
    pagina.style.backgroundImage = `linear-gradient(135deg, ${claro}, ${fuerte})`;
    tipoDePoke.style.backgroundColor = fuerte;
    tipoDePoke.style.color = "white";
    buscarBtn.style.backgroundColor = fuerte;
}

// Regresar todo a como estaba si hubo error
function limpiarPokemon() {
    nombrePoke.innerText = "???";
    tipoDePoke.innerText = "???";
    tipoDePoke.style.backgroundColor = "";
    tipoDePoke.style.color = "";
    pokeImg.src = "";
    pokeImg.alt = "???";
    detalles.classList.add("hidden");
    pagina.style.backgroundImage = "";
    buscarBtn.style.backgroundColor = "";
}

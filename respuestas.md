# Actividad 43 – Buscar Pokémon (JavaScript + API)

## ¿Qué es y para qué sirve cada concepto?

**DOM (Document Object Model)**
Es la representación del documento HTML como un árbol de objetos que el navegador crea al cargar la página. Sirve para que JavaScript pueda leer y modificar los elementos de la página (texto, imágenes, estilos, atributos) sin recargarla; por ejemplo con `document.getElementById()` e `innerText`.

**API (Application Programming Interface)**
Es un conjunto de reglas que permite que dos programas se comuniquen entre sí. Sirve para pedir datos o servicios a otro sistema sin conocer su código interno; en esta práctica usamos la PokéAPI para obtener la información de los Pokémon.

**REST (RESTful API)**
Es un estilo de arquitectura para crear APIs web que usa URLs para identificar recursos (por ejemplo `/api/v2/pokemon/pikachu`) y los métodos de HTTP (GET, POST, PUT, DELETE) para trabajar con ellos. Sirve para que las APIs sean simples, ordenadas y fáciles de consumir desde cualquier cliente, como el navegador con `fetch()`.

**JSON (JavaScript Object Notation)**
Es un formato de texto ligero para guardar e intercambiar datos usando pares `"clave": valor`, arreglos y objetos. Sirve para enviar información entre el servidor y el cliente; la PokéAPI responde en JSON y con `res.json()` lo convertimos en un objeto de JavaScript.

## Correcciones al código de `poke.js`

1. El evento click llamaba a `buscarPokeEnAPI()`, pero la función se llama `buscarPokemon()`.
2. Faltaba poner el mensaje de éxito en verde (`mensaje.style.color = "green"`).
3. Faltaba mostrar el nombre (`nombrePoke.innerText`) y la imagen (`pokeImg.src`) en el HTML.

## Retos adicionales hechos
- Estilo con TailwindCSS (por CDN: `<script src="https://cdn.tailwindcss.com"></script>`).
- Buscar con la tecla `Enter`.
- Mostrar mensaje de "Cargando...".
- SVG animado (una Pokébola que gira con `animate-spin`) mientras carga.
- Más características: número, altura, peso, habilidades y estadísticas base con barras.
- El fondo de la página, el botón y la etiqueta del tipo cambian de color según el tipo del Pokémon.

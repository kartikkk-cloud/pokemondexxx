const pokemonNamesEl = document.getElementById("pokemonNames");
const pokemonDetailsEl = document.getElementById("pokemonDetails");

const POKEMON_LIMIT = 10;

async function fetchPokemonList() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}`
  );
  const data = await response.json();
  return data.results;
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return response.json();
}

function displayPokemonNames(pokemonList) {
  pokemonList.forEach((pokemon) => {
    const li = document.createElement("li");
    li.textContent =
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    li.addEventListener("click", async () => {
      const details = await fetchPokemonDetails(pokemon.url);
      showDetails(details);
    });
    pokemonNamesEl.appendChild(li);
  });
}

function showDetails(details) {
  pokemonDetailsEl.innerHTML = `
<h2>${details.name.charAt(0).toUpperCase() + details.name.slice(1)}</h2>
<img src="${details.sprites.front_default}" alt="${details.name}" />
<div class="info">
  <p><strong>ID:</strong> ${details.id}</p>
  <p><strong>Height:</strong> ${details.height}</p>
  <p><strong>Weight:</strong> ${details.weight}</p>
  <p><strong>Types:</strong> ${details.types
    .map((t) => `<span class="type">${t.type.name}</span>`)
    .join(" ")}</p>
  <p><strong>Base Stats:</strong></p>
  <ul>
    ${details.stats
      .map((stat) => `<li>${stat.stat.name}: ${stat.base_stat}</li>`)
      .join("")}
  </ul>
</div>
`;
}

async function initPokedex() {
  const pokemonList = await fetchPokemonList();
  displayPokemonNames(pokemonList);
}

initPokedex();

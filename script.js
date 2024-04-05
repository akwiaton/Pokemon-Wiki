let pokemonPower = [];
let statsnumber = [0, 1, 2, 3, 4, 5];
let pokemonNames = [];
let currentPokemon;
let currentPokemonIndex = 20; // Start from the next page.
let colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  steel: "#B7B7CE",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
};

async function init() {
  await loadPokemonInfoCardSmall();
}

async function displayBigCard(i) {
  await loadPokemon(i);
  renderChart(i, pokemonPower);
}

async function loadPokemonInfoCardSmall() {
  for (let i = 1; i <= currentPokemonIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let pokemonTypes = currentPokemon["types"];
    let pokemonName = currentPokemon["name"];
    pokemonNames.push(pokemonName); // Pokemon  Namen in Array speichern
    renderPokemonCardSmall(i, currentPokemon, pokemonTypes);
  }
}

async function renderPokemonCardSmall(i, currentPokemon, pokemonTypes) {
  let pokemoncards = document.getElementById("gallery_content");
  pokemoncards.innerHTML += /*html*/ `
        <div class="small_card_gallery">
        <div class="pokemon_small_card" onclick=" displayBigCard(${i})" style="background-color:${colors[pokemonTypes[0].type.name]}">
            <h3>${currentPokemon["name"]}</h3>
            <p class="pokemonTypeSmall">${pokemonTypes["0"]["type"]["name"]}</p>
            <div class="card_container">
                <img class="img_card_small" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i}.svg">
            </div>
        </div>
        </div>
        `;
}

async function loadPokemon(i) {
  let id = i;
  let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let response = await fetch(url);
  let responseJSON = await response.json();
  let pokemonTypes = responseJSON["types"];
  let pokemonName = responseJSON["name"];
  let baseStat = responseJSON["stats"]; // ist ein array mit 6 Werten [39, 52, 43, 60, 50, 65]
  pokemonPower = []; // load first 6 values from array
  for (let j = 0; j < statsnumber.length; j++) {
    let stat = baseStat[statsnumber[j]]["base_stat"];
    pokemonPower.push(stat);
  }
  renderPokemonInfo(i, responseJSON, pokemonTypes, pokemonName);
}

function renderPokemonInfo(i, responseJSON, pokemonTypes, pokemonName) {
  let modalBg = document.getElementById("modal-bg");
  let modalContent = document.getElementById("modal-content");
  modalContent.innerHTML = "";
  modalBg.style.display = "block";
  modalContent.innerHTML = displayHTML(i, responseJSON, pokemonTypes, pokemonName);
  let typeContent = document.getElementById(`pokemonType${i}`);
  for (let j = 0; j < pokemonTypes.length; j++) {
    const type = pokemonTypes[j]["type"]["name"];
    typeContent.innerHTML += `
     <p id="typeColor">${type}</p>
     `;
  }
  closeBigCard(modalBg);
}

function displayHTML(i, responseJSON, pokemonTypes, pokemonName) {
  return /*html*/ `
 <div class="main_container">
     <img class="icon left" id="arrow_left" src="./img/left.png" onclick= "previousCard(${i})"/>
     <div id="container" style="background-color:${
       colors[pokemonTypes[0].type.name]
     }">
         <h3 id="pokemonName">${responseJSON["name"]}</h3>
         <div class="img_container">
             <img id="pokemon_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${[i]}.svg">
         </div>
         <div class="type_container">
         <p id="pokemonType${i}" class="pokemonType"></p>
         </div>
     
         <div class="info_container">
             <div id="chart_container"> 
             <canvas id="pokemonChart${i}"></canvas>
             </div>
         </div>
     </div>
     <img class="icon right" src="./img/right.png" onclick="nextCard(${i})">
 </div>
`;
}

function closeBigCard(modalBg) {
  window.onclick = function (event) {
    if (event.target == modalBg) {
      modalBg.style.display = "none";
    }
  };
}

function nextCard(i) {
  if (i == currentPokemonIndex.length - 1) {
    displayBigCard(i);
  } else {
    displayBigCard([i + 1]);
  }
}

function previousCard(i) {
  if (i <= 1) {
      document.getElementById('arrow_left').classList.add('d-none');
  } else {
    displayBigCard(i - 1);
  }
}

async function loadMorePokemon() {
  for (let i = currentPokemonIndex + 1; i <= currentPokemonIndex + 20; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let pokemonTypes = currentPokemon["types"];
    renderPokemonCardSmall(i, currentPokemon, pokemonTypes);
  }
  currentPokemonIndex += 20;
}

function searchPokemon() {
  let search = document.getElementById("search").value;
  search = search.toLowerCase();
  console.log(search);

  let searchPokemon = document.getElementsByClassName("pokemon_small_card");

  for (let i = 0; i < searchPokemon.length; i++) {
    let searchName = pokemonNames[i];

    if (searchName.toLowerCase().includes(search)) {
      searchPokemon[i].style.display = "block";
    } else {
      searchPokemon[i].style.display = "none";
    }
  }
}

async function goToStart() {
    document.getElementById('search').value = '';
    document.getElementById('gallery_content').innerHTML = '';
    await loadPokemonInfoCardSmall();
}

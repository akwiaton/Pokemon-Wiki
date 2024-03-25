let pokemonName = [];
let limit = 20;
let offset = 0;
let pokemonPower = [];
let currentPokemon;


async function init() {
    await loadInfoForGallery();
}

async function displayBigCard() {
    await loadPokemon();   
    renderPokemonInfo();
    await loadChart();
    renderChart();
}

async function loadPokemon() {
    let url =`https://pokeapi.co/api/v2/pokemon//butterfree`;
    let response = await fetch(url);
    currentPokemon = await response.json();

    // console.log('Loaded pokemon', currentPokemon);
}

function  renderPokemonInfo(){
    document.getElementById("pokemonName").innerHTML= currentPokemon['name'];
    document.getElementById('pokemonType').innerHTML =  currentPokemon['types']['0']['type']['name'];
    document.getElementById('pokemonUndertype').innerHTML =  currentPokemon['types']['1']['type']['name'];
    document.getElementById('pokemon_img').src = currentPokemon['sprites']['other']['dream_world']['front_default'];
}

async function loadChart() {
    let url = `https://pokeapi.co/api/v2/pokemon/butterfree`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    

    // console.log(currentPokemon['stats'][0]['base_stat']); // hier bekomme ich das wert 39

    let baseStat = currentPokemon['stats']; // ist ein array mit 6 Werten [39, 52, 43, 60, 50, 65]

    for (let i = 0; i < baseStat.length; i++) {
        let chartElement = baseStat[i]['base_stat'];

        // console.log(chartElement);

        pokemonPower.push(chartElement);
    }
}

// function hideGallery() {
//     document.getElementById('pokemon_big_card').classList.remove('d-none' );
//     document.getElementById('pokemon_gallery') .classList.add('d-none');
// }
// function showGallery() {
//     document.getElementById('pokemon_big_card').classList.add('d-none');
//     document.getElementById('pokemon_gallery').classList.remove('d-none');
// }


async function loadInfoForGallery() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let result = currentPokemon.results;

    
    for (let i = 0; i < result.length; i++) {

        let cardName = result[i]['name'];
        pokemonName.push(cardName);
        
        // let cardType = currentPokemon.type[i]['name'];
        // let cardUndertype = currentPokemon.undertype[i]['name'];
        // let cardImg = currentPokemon.image[i]['front_default'];
    }
}

function renderPokemonCardSmall() {
    let pokemoncards = document.getElementById('gallery_content').innerHTML;
    pokemoncards.innerHTML = "";

    for (let j = offset; j < pokemonName.length; j++) {
        const name = pokemonName[j];
        pokemoncards.innerHTML += loadPokemonCardSmall(name);
    }
}

function loadPokemonCardSmall(name) {
    return /*html*/` 
    <div class="pokemon_small_card">
    <h1>${name}</h1>
    <p>${cardType}</p>
    <p>${cardUndertype}</p>
    <img src="${cardImg}" alt="Pokemon image">
    </div>
    <button>Lade weitere</button>
    `;
}


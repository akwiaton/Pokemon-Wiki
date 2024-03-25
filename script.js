let pokemonPower = [];
let currentPokemon;


async function init() {
    await loadPokemon();   
    renderPokemonInfo();
    await loadChart();
    renderChart();
}

async function loadPokemon() {
    let url ='https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();

    // console.log('Loaded pokemon', currentPokemon);
}

function  renderPokemonInfo(){
    document.getElementById("pokemonName").innerHTML= currentPokemon['name'];
    document.getElementById('pokemon_img').src = currentPokemon['sprites']['front_shiny'];
}

async function loadChart() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
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

function showGallery() {
    document.getElementById('pokemon_big_card').classList.add('d-none');
    document.getElementById('pokemon_gallery').classList.remove('d-none');
}

function  hideGallery() {
    document.getElementById('pokemon_big_card').classList.remove('d-none' );
    document.getElementById('pokemon_gallery') .classList.add('d-none');
}

async function loadSmallCard() {
    loadPokemon();
    renderPokemonInfo();
    // hintergrundfarbe
    // eigenschaften
}
function renderPokemonGallery() {
    let pokemoncards = document.getElementById('content').innerHTML;
    pokemoncards.innerHTML = '';
    pokemoncards.innerHTML = `
    <h2>${currentPokemon['name']}</h2>
    <p>fire</p>
    <p> ${currentPokemon['sprites']['front_shiny']}

    `;
}


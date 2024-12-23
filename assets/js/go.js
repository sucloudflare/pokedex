const pokemonCarousel = document.querySelector('.pokemon-carousel');
let pokemonData = [];

// Função para buscar os 40 primeiros Pokémons
async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40');
    const data = await response.json();
    pokemonData = data.results;

    // Adicionar os Pokémon ao carrossel
    pokemonData.forEach((pokemon, index) => {
        const pokemonItem = document.createElement('div');
        pokemonItem.classList.add('pokemon-item');
        
        const pokemonImage = document.createElement('img');
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`;
        pokemonImage.alt = pokemon.name;
        pokemonImage.classList.add('img-fluid', 'rounded');
        pokemonImage.addEventListener('click', () => fetchPokemonDetails(pokemon.url));

        const pokemonName = document.createElement('p');
        pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        pokemonItem.appendChild(pokemonImage);
        pokemonItem.appendChild(pokemonName);
        pokemonCarousel.appendChild(pokemonItem);
    });

    // Inicializar o Slick Carousel
    $('.pokemon-carousel').slick({
        slidesToShow: 3,         // Mostrar 3 Pokémons por vez
        slidesToScroll: 3,       // Girar 3 Pokémons por vez
        infinite: true,          // Rotação infinita
        dots: true,              // Mostrar os pontos de navegação
        prevArrow: '<button type="button" class="slick-prev">←</button>',
        nextArrow: '<button type="button" class="slick-next">→</button>',
    });
}

// Função para buscar os detalhes de um Pokémon
async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    const data = await response.json();

    // Exibir as informações do Pokémon
    document.getElementById('pokemonName').textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.getElementById('pokemonImage').src = data.sprites.other['official-artwork'].front_default;
    document.getElementById('pokemonType').textContent = data.types.map(type => type.type.name).join(', ');
    document.getElementById('pokemonHeight').textContent = `${data.height / 10} m`;
    document.getElementById('pokemonWeight').textContent = `${data.weight / 10} kg`;
    document.getElementById('pokemonAbility').textContent = data.abilities.map(ability => ability.ability.name).join(', ');
    document.getElementById('pokemonDescription').textContent = 'Descrição do Pokémon irá aqui.';
    document.getElementById('pokemonEvolution').textContent = 'Evolução do Pokémon será aqui.';

    // Adicionar animações
    document.querySelector('.carousel-info').classList.add('show');
    document.querySelector('#pokemonImage').classList.add('show');
}

// Exibição da notificação tutorial
window.onload = function() {
    document.getElementById('tutorialNotification').classList.add('show');
    setTimeout(() => {
        document.getElementById('tutorialNotification').classList.remove('show');
    }, 5000);
}

function closeTutorial() {
    document.getElementById('tutorialNotification').classList.remove('show');
}

fetchPokemonList();

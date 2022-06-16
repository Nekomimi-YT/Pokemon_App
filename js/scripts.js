/* 
Using data from this pokemon App for this task:
(https://pokeapi.co/api/v2/pokemon/?limit=150)

*/

// Current short list of representatives

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//returns the entire pokemonList
  function getAll() {
    return pokemonList;
  }

//adds objects to pokemonList
function add(pokemon) {
  if (
    typeof pokemon === 'object' &&
    'name' in pokemon
  ) {
    pokemonList.push(pokemon);
  } else {
    console.log("Pokemon is not valid");
  }
}

//printing name's names to the DOM in button form using 

  function addListItem(pokemon) {
    //link to <ul class = 'list'> in HTML and create <li>
    let buttonContainer = document.querySelector('.button-container'); //container for the pokemon name buttons
    let pokemonList = document.querySelector('.list');
    let listItem = document.createElement('li');
    //create a new button element and style
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add('button-style');
    //add button as a <li>, then <li> to the <ul>, then <ul> to <div> (buttonContainer)
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    buttonContainer.appendChild(pokemonList);
    //when clicked, buttons log name of Congress Representative to the console
    button.addEventListener('click', function () {
      showDetails(pokemon); 
    });  
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem
  };
})();

pokemonRepository.loadList().then(function() {
  // Data is loaded...
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
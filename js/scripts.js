/* 
Using data from this pokemon App for this task:
(https://pokeapi.co/api/v2/pokemon/?limit=150)

*/

// Creating an IIFE to hold the Pokemon Repository and critical functions

let pokemonRepository = (function () {
  
  //creating the Pokemon List from outside source
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //fetches the pokemon list from the api
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

//printing pokemon names to the DOM in button form using bootstrap
  function addListItem(pokemon) {
      let pokemonList = document.querySelector('ul');
      pokemonList.classList.add('pokemonList');
      let listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'col-sm-12', 'col-md-6', 'col-lg-3');
      let button = document.createElement('button');
      button.classList.add('btn', 'btn-light', 'btn-search');
      //Capitalize first letter of Pokemon name and add as button text
      button.innerText = (pokemon.name[0].toUpperCase() + pokemon.name.substring(1));
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '.modal');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener('click', function () {
        showDetails(pokemon); 
      });
    }
    
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  };

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      typeList = [];
      details.types.forEach((typeItem) => { //typeItem = types in the API
        let name = typeItem.type.name
        name = name[0].toUpperCase() + name.substring(1);
        typeList.push(name)
      });
    item.types = typeList;
    abilityList = [];
      details.abilities.forEach((abilityItem) => { //abiityItem = abilities in the API
        let name = abilityItem.ability.name
        name = name[0].toUpperCase() + name.substring(1);
        abilityList.push(name)
      });
    item.abilities = abilityList;
    }).catch(function (e) {
      console.error(e);
    });
  }
  
  //adding modal template to display pokemon data
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');
    
    //clear title and body elements from the modal
    modalTitle.empty();
    modalBody.empty();

    //create the name element in modal content
    let nameElement = $('<h1>' + item.name[0].toUpperCase() + item.name.substring(1) + '</h1>');
    //create the image in modal content
    let imageElement = $('<img class="modal-img">')
    imageElement.attr('src', item.imageUrl);
    //create the height element for modal
    let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
    //create the weight element for modal
    let weightElement = $('<p>' + 'Weight: ' + item.weight + '</p>');
    let typeElement = $('<p>' + 'Types: ' + item.types + '</p>');
    let abilityElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);

  }

  //Filter search input against button list
  function filterList() {
    let value = searchInput.val().toLowerCase();
  
    $(".pokemonList > li").each(function() {
        if ($(this).text().toLowerCase().search(value) > -1) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    filterList: filterList
  };
})();

//Create a list of Pokemon name buttons and display on the screen. 
//When clicked, each button pulls up a modal to display pokemon information
pokemonRepository.loadList().then(function() {
  // Data is loaded...
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//Searchbar functionality: filters displayed buttons by input  
//Hides all buttons that don't match search input  
let searchInput = $('input');
searchInput.on('input', pokemonRepository.filterList);
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

//printing name's names to the DOM in button form using 

  function addListItem(pokemon) {
    //link to <ul class = 'list'> in HTML and create <li>
    let buttonContainer = document.querySelector('.button-container'); //container for the pokemon name buttons
    let pokemonList = document.querySelector('.list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    //create a new button element and style
    let button = document.createElement('button');
    button.innerText = (pokemon.name);
    button.classList.add('btn');
    button.classList.add('btn-light');
    //add button as a <li>, then <li> to the <ul>, then <ul> to <div> (buttonContainer)
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    buttonContainer.appendChild(pokemonList);
    //when clicked, buttons initiate the showDetails function to show a modal with more information
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
    }).catch(function (e) {
      console.error(e);
    });
  }
      //adding modal template to display pokemon data
  let modalContainer = document.querySelector('#modal-container');
  function showModal(item) {
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.innerHTML = '';
    
    //creating a close button to exit the modal
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    //connecting to "#image-container" in the HTML and loading a dynamic image into the container
    //let imageContainer = document.querySelector('#image-container');
    let imageContainer = document.createElement('div')
    let imageElement = document.createElement('img');
    imageElement.classList.add('image-element');
    imageElement.src = item.imageUrl;
    imageContainer.appendChild(imageElement);

    //adding Pokemon data to the modal - probably not the final layout
    let titleElement = document.createElement('h2');
    let heightElement = document.createElement('p');
    let weightElement = document.createElement('p');
    titleElement.innerText = item.name;
    heightElement.innerText = 'Height: ' + item.height; 
    weightElement.innerText = 'Weight: ' + item.weight;

    //adding all new elements to the modal
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageContainer);
    modal.appendChild(heightElement);
    modal.appendChild(weightElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
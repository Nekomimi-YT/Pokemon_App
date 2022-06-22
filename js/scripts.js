/* 
Using data from this pokemon App for this task:
(https://pokeapi.co/api/v2/pokemon/?limit=150)

*/

// Current short list of representatives

let pokemonRepository = (function () {
  
  //creating the Pokemon List from outside source
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
      
      //adding modal template to display pokemon data
  
      let modalContainer = document.querySelector('#modal-container');

      function showModal(title, text) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
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

      //connect pokemon buttons here to display all data
      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });
  })};

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
/* Website/ API source: https://housestockwatcher.com/
Using data from the first row of representatives for this task:
(https://housestockwatcher.com/summary_by_rep)

API links: https://housestockwatcher.com/api, https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json

Data is public disclosure of stock trades made by members of the US House of Representatives. 
Each array in the array tradeList organizes data for one representative - name, state they represent, 
political party, the type of trade (purchase or sale), the total trade volume (total amount of 
money exchanged in both buy and sell transactions), and the top ten company tickets traded by share volume. 
*/

// Current short list of representatives

let tradeRepository = (function () {
  let tradeList = [];
  let apiUrl = 'https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json';

//returns the entire tradeList
  function getAll() {
    return tradeList;
  }

//adds objects to tradeList
  function add(congressRep) {
    if (typeof congressRep !== 'object') {
      return 'Additions must be added as objects';
    }else if (Object.keys(congressRep) !== 'representative'/*, 'state', 'party', 'tradeType', 'tradeVolume', 'topTickers'*/) {
      return 'Object keys invalid'
    }else{
      tradeList.push(congressRep);
    }    
  }

//printing representative's names to the DOM in button form using 

  function addListItem(congressRep) {
    //link to <ul class = 'list'> in HTML and create <li>
    let repList = document.querySelector('.list');
    let listItem = document.createElement('li');
    //create a new button element and style
    let button = document.createElement('button');
    button.innerText = (congressRep.representative);
    button.classList.add('button-style');
    //add button to the page
    listItem.appendChild(button);
    repList.appendChild(listItem);
    //when clicked, buttons log name of Congress Representative to the console
    button.addEventListener('click', function () {
      showDetails(congressRep); 
    });  
  }

  function showDetails(congressRep) {
    console.log(congressRep.representative);
  };

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {  //my aptUrl is already .json.  Do I need this step? 
      json.results.forEach(function (item) {  //can I create a variable for json.results for an array?
        congressRep = {
          representative: item.representative  //getting the representative name from each item in json array
        };
        let distinct = [] //need to make sure not to duplicate names in the output, so trying to create a function for that
          for (let i = 0; i < json.results.length; i++) {   //is this a good case use for filter()?
            if (json.results[i].representative not in distinct) {
              add(congressRep);
              distinct.push(json.results[i].representative)
            }
          }
        });
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList
  };
})();

tradeRepository.loadList().then(function() {
  tradeRepository.getAll().forEach(function(congressRep) {
    tradeRepository.addListItem(congressRep);
  });
});



/* keeping this code right now so I can review string literal templates
document.write(`${congressRep.name}: ${congressRep.party} representing ${congressRep.state}<br>Total trade volume: 
  ${congressRep.tradeVolume}<br>Stock purchases: ${congressRep.tradeType.purchase} *** Stock sales: 
  ${congressRep.tradeType.sale}<br>Top Traded Companies by Ticker: ${congressRep.topTenTickers}`);

//searching for less than 10 companies traded and noting that with a comment in the DOM
  if (congressRep.topTenTickers.length < 10) {
   document.write('<em> *Fewer companies traded overall </em>');
  }
  document.write('<br><br>');
  
  
  let tradeList = [
    {
      name: 'Hon. Virginia Foxx',
      state: 'North Carolina',
      party: 'Republican',
      tradeType: {
        purchase: 220, sale: 34
      },
      tradeVolume: '~$6,827,627.00',
      topTenTickers: [
        'CWEN.A', ' OLP', ' T', ' PPL', ' BP', ' NHI', ' SO', ' DUK', ' BXMT', ' AM'
      ]  
    },
    {
      name: 'Hon. Alan S. Lowenthal',
      state: 'California',
      party: 'Democrat',
      tradeType: {
        purchase: 260, sale: 356
      },
      tradeVolume: '~$5,348,814.00',
      topTenTickers: [
        'RUN', ' SH', ' PSQ', ' IWN', ' COLD', ' BSX', ' BKNG', ' GM', ' IFF', ' NFLX'
      ]
    },
    {
      name: 'Hon. Aston Donald McEachin',
      state: 'Virginia',
      party: 'Democrat',
      tradeType: {
        purchase: 0, sale: 0
      },
      tradeVolume: '~$48,003.00',
      topTenTickers: [
        'RIVN', ' TXN', ' NXPI', ' ON', ' D', ' AXP'
      ]
    },
    {
      name: 'Hon. Austin Scott',
      state: 'Georgia',
      party: 'Republican',
      tradeType: {
        purchase: 40, sale: 35
      },
      tradeVolume: '~$918,537.50',
      topTenTickers: [
        'FCEL', ' PLUG', ' CLNE', ' BE', ' T', ' JNJ', ' KPLT', ' NVVE', ' BLDP', ' KPLTW'
      ]
    },
    {
      name: 'Hon. Thomas Suozzi',
      state: 'New York',
      party: 'Democrat',
      tradeType: {
        purchase: 57, sale: 41
      },
      tradeVolume: '~$3,441,549.00',
      topTenTickers: [
        'MS', ' APPL', ' DG', ' BBH', ' CG', ' PYPL', ' SQ', ' AMD', ' GNRC', ' CTRL'
      ]
    }
  ];*/
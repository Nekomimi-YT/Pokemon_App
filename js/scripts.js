/* Website/ API source: https://housestockwatcher.com/
Using data from the first row of representatives for this task:
(https://housestockwatcher.com/summary_by_rep)

API link: https://housestockwatcher.com/api

Data is public disclosure of stock trades made by members of the US House of Representatives. 
Each array in the array tradeList organizes data for one representative - name, state they represent, 
political party, the type of trade (purchase or sale), the total trade volume (total amount of 
money exchanged in both buy and sell transactions), and the top ten company tickets traded by share volume. 
*/

// Current short list of representatives

let tradeRepository = (function () {
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
];

  function getAll() {
    return tradeList;
  }

  function add(houseMember) {
    tradeList.push(houseMember);
  }

  return {
    getAll,
    add
  };
})();

//printing representative's information to the DOM
tradeList.forEach(function(congressRep) {
  document.write(`${congressRep.name}: ${congressRep.party} representing ${congressRep.state}<br>Total trade volume: 
  ${congressRep.tradeVolume}<br>Stock purchases: ${congressRep.tradeType.purchase} *** Stock sales: 
  ${congressRep.tradeType.sale}<br>Top Traded Companies by Ticker: ${congressRep.topTenTickers}`);

  //searching for less than 10 companies traded and noting that with a comment in the DOM
  if (congressRep.topTenTickers.length < 10) {
    document.write('<em> *Fewer companies traded overall </em>');
  }
  document.write('<br><br>');
  }
)
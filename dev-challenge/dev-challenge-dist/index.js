/**
 * This javascript file will constitute the entry point of your solution.
 *
 * Edit it as you need.  It currently contains things that you might find helpful to get started.
 */

// This is not really required, but means that changes to index.html will cause a reload.
require('./site/index.html')
// Apply the styles in style.css to the page.
require('./site/style.css')

// if you want to use es6, you can do something like
//     require('./es6/myEs6code')
const utils = require('./es6/utils.js')
// here to load the myEs6code.js file, and it will be automatically transpiled.

// Change this to get detailed logging from the stomp library
global.DEBUG = false
const url = "ws://localhost:8011/stomp"
const client = Stomp.client(url)
let currencyPairData=[];
let counter=0;
let subscription;
const seconds=30;
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
}

function connectCallback() {
  subscription=client.subscribe("/fx/prices", function(response) {
    let {currencyPairData,parsedData,index}=utils.updateTable(response);
    utils.insertRowToTable(currencyPairData);
  });

   //---to be removed
//    let mockData=[{bestAsk: 1,
//     bestBid: 1,
//     lastChangeAsk: -0.05191507870598633,
//     lastChangeBid: -2,
//     midPrice: 1.416933031611609,
//     name: "gbpusd",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()
//   },
//   {bestAsk: 2,
//     bestBid: 2,
//     lastChangeAsk: -0.05191507870598633,
//     lastChangeBid:1,
//     midPrice: 1.416933031611609,
//     name: "gbpusd",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: 1597083326316
//   },
//   { bestAsk:1,
//     bestBid:1,
//     lastChangeAsk: -0.05191507870598633,
//     lastChangeBid: -60,
//     midPrice: 1.416933031611609,
//     name: "gbpusd",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()-25000
//   },
//   { bestAsk: 2,
//     bestBid: 10,
//     lastChangeAsk: -4.05191507870598633,
//     lastChangeBid: 0,
//     midPrice: 1.416933031611609,
//     name: "test",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()-25000
//   },
//   { bestAsk: 4,
//     bestBid:1,
//     lastChangeAsk: -4.05191507870598633,
//     lastChangeBid: 0,
//     midPrice: 1.416933031611609,
//     name: "test",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()-25000
//   },
//   { bestAsk: 100,
//     bestBid:200,
//     lastChangeAsk: -4.05191507870598633,
//     lastChangeBid:-8,
//     midPrice: 1.416933031611609,
//     name: "test",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()-25000
//   },
//   { bestAsk: 10,
//     bestBid:20,
//     lastChangeAsk: -4.05191507870598633,
//     lastChangeBid: -10,
//     midPrice: 1.416933031611609,
//     name: "test",
//     openAsk: 1.4854723850916542,
//     openBid: 1.431927614908346,
//     timeStamp: Date.now()-25000
//   }
// ]

//  for(var i in mockData) {
//    let data={}
//    data.body=JSON.stringify(mockData[i])
//    let {currencyPairData,parsedData,index}=utils.updateTable(data);
//     if(currencyPairData.length>100)
//     subscription.unsubscribe();
//     utils.insertRowToTable(currencyPairData);
//   }

}


client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
})

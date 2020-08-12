const utils = require('../../es6/utils.js');

describe("Utility functions: ", function() {

    it('updateTable function should return the index where the new row will be added',function() {
      let data={}
      data.body='{"name":"gbpusd","bestBid":1.4131038790774102,"bestAsk":1.4529379044147512,"openBid":1.431927614908346,"openAsk":1.4854723850916542,"lastChangeAsk":-0.026322435893355145,"lastChangeBid":3.0487445430375919}'
      let result=utils.updateTable(data);
      data.body='{"name":"gbpusd","bestBid":1.4131038790774102,"bestAsk":1.4529379044147512,"openBid":1.431927614908346,"openAsk":1.4854723850916542,"lastChangeAsk":-0.026322435893355145,"lastChangeBid":4.0487445430375919}'
      result=utils.updateTable(data);
      expect(utils.currencyPairData.length).toBe(2);
      expect(result.index).toBe(1);
    })

    it("filterByTimeStamp function should filter and return the data generated in last 30 seconds", function() {
      let mockData=[{bestAsk: 1.4413329878423087,
        bestBid: 1.3925330753809095,
        lastChangeAsk: -0.05191507870598633,
        lastChangeBid: -0.07492398600843853,
        midPrice: 1.416933031611609,
        name: "gbpusd",
        openAsk: 1.4854723850916542,
        openBid: 1.431927614908346,
        timeStamp: Date.now()
      },
      {bestAsk: 1.4413329878423087,
        bestBid: 1.3925330753809095,
        lastChangeAsk: -0.05191507870598633,
        lastChangeBid: -0.07492398600843853,
        midPrice: 1.416933031611609,
        name: "gbpusd",
        openAsk: 1.4854723850916542,
        openBid: 1.431927614908346,
        timeStamp: 1597083326316
      },
      { bestAsk: 1.4413329878423087,
        bestBid: 1.3925330753809095,
        lastChangeAsk: -0.05191507870598633,
        lastChangeBid: -0.07492398600843853,
        midPrice: 1.416933031611609,
        name: "gbpusd",
        openAsk: 1.4854723850916542,
        openBid: 1.431927614908346,
        timeStamp: Date.now()-25000
      }
    ]
      expect(utils.filterByTimeStamp(mockData).length).toBe(2);
    });
  });

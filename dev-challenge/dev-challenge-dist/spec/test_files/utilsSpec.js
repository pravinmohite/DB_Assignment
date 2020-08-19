const utils = require('../../es6/utils.js');

describe("Utility functions: ", function() {

    it('updateTable function should merge the data if data with same name already exists',function() {
      let data={};
      data.body='{"name":"gbpusd","bestBid":1.4131038790774102,"bestAsk":1.4529379044147512,"openBid":1.431927614908346,"openAsk":1.4854723850916542,"lastChangeAsk":-0.026322435893355145,"lastChangeBid":3.0487445430375919}'
      let result=utils.updateTable(data);
      data.body='{"name":"gbpusd","bestBid":1.4131038790774102,"bestAsk":1.4529379044147512,"openBid":1.431927614908346,"openAsk":1.4854723850916542,"lastChangeAsk":-0.026322435893355145,"lastChangeBid":4.0487445430375919}'
      result=utils.updateTable(data);
      expect(utils.currencyPairData.length).toBe(1);
    })

    it("filterByTimeStamp function should filter and return the data generated in last 30 seconds", function() {
      let mockData=[
        {midPrice: 2,timeStamp:Date.now()},
        {midPrice: 4,timeStamp:Date.now()},
        {midPrice: 1,timeStamp:(Date.now()-35000)}
     ]
     let result=utils.filterByTimeStamp(mockData);
      expect(result.length).toBe(2);
    });

    it("returnMidPriceAsArray function should return array of midprice", function() {
      let mockData=[
        {midPrice: 2,timeStamp:Date.now()},
        {midPrice: 4,timeStamp:Date.now()}
     ]
      expect(utils.returnMidPriceAsArray(mockData).timeStamp).toBeUndefined();
      expect(utils.returnMidPriceAsArray(mockData)[0]).toBe(2);
    });

  });

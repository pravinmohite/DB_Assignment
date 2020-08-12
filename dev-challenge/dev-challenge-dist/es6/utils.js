let tableBodyId='currency-pairs-tablebody';
let currencyPairData=[];
const seconds=30;

function filterByTimeStamp(midPrice) {
  let time=Date.now()-seconds*1000;
  let result= midPrice.map((item)=> {
    if(item.timeStamp>=time)
      return item.midPrice;
  }).filter((item)=>{
     if(item)
      return item;
  })
  return result;
}

function drawSparkLine(finalMidPriceList,id) {
  const sparks = document.getElementById(id);
  Sparkline.draw(sparks,finalMidPriceList);
}

function insertRowToTable(currencyPairData,parsedData,index) {
  var table= document.getElementById(tableBodyId);
  var row = table.insertRow(index);
  var cellName = row.insertCell(0);
  var cellBestBid = row.insertCell(1);
  var cellBestAsk = row.insertCell(2);
  var cellLastChangeBid = row.insertCell(3);
  var cellLastChangeAsk = row.insertCell(4);
  cellName.innerHTML = parsedData.name;
  cellBestBid.innerHTML = parsedData.bestBid;
  cellBestAsk.innerHTML = parsedData.bestAsk;
  cellLastChangeBid.innerHTML = parsedData.lastChangeBid;
  cellLastChangeAsk.innerHTML = parsedData.lastChangeAsk;
  let tempMidPrice=(parsedData.bestAsk+parsedData.bestBid)/2;
  parsedData.midPrice=tempMidPrice;

  let cellMidPriceSparkLine=row.insertCell(5);
  cellMidPriceSparkLine.id=`mid-price-sparkline_${index}`;
  let finalMidPriceList=filterByTimeStamp(currencyPairData);
  drawSparkLine(finalMidPriceList,cellMidPriceSparkLine.id);
}

function updateTable(data) {
  let parsedData=JSON.parse(data.body);
  parsedData.timeStamp=Date.now();
  currencyPairData.push(parsedData);
  currencyPairData.sort(function(a,b) {
    return a.lastChangeBid-b.lastChangeBid;
  })
  let index=currencyPairData.indexOf(parsedData);
  return {currencyPairData,parsedData,index};
}

exports.updateTable=updateTable;
exports.insertRowToTable=insertRowToTable;
exports.filterByTimeStamp=filterByTimeStamp;
exports.currencyPairData=currencyPairData;
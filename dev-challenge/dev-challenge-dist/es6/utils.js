let tableBodyId='currency-pairs-tablebody';
let currencyPairData=[];
const seconds=30;

function filterByTimeStamp(data) {
  let time=Date.now()-seconds*1000;
  let result= data.filter((item)=> {
    return item.timeStamp>=time;
  })
 return result;
}

function returnMidPriceAsArray(data) {
  let result= data.map((item)=>{
     return item.midPrice;
   })
  return result; 
}

function drawSparkLine(finalMidPriceList,id) {
  const sparks = document.getElementById(id);
  Sparkline.draw(sparks,finalMidPriceList);
}

function insertRowToTable(currencyPairData) {
  var table= document.getElementById(tableBodyId);
  table.innerHTML="";
  currencyPairData.forEach((data,index) => {
    let parsedData=data.parsedData;
    let row = table.insertRow(index);
    let cellName = row.insertCell(0);
    let cellBestBid = row.insertCell(1);
    let cellBestAsk = row.insertCell(2);
    let cellLastChangeBid = row.insertCell(3);
    let cellLastChangeAsk = row.insertCell(4);
    cellName.innerHTML = parsedData.name;
    cellBestBid.innerHTML = parsedData.bestBid;
    cellBestAsk.innerHTML = parsedData.bestAsk;
    cellLastChangeBid.innerHTML = parsedData.lastChangeBid;
    cellLastChangeAsk.innerHTML = parsedData.lastChangeAsk;
    let cellMidPriceSparkLine=row.insertCell(5);
    cellMidPriceSparkLine.id=`mid-price-sparkline_${index}`;
    data.sparklineData=filterByTimeStamp(data.sparklineData);
    let finalMidPriceList=returnMidPriceAsArray(data.sparklineData);
    drawSparkLine(finalMidPriceList,cellMidPriceSparkLine.id);
 });
}

function updateTable(data) { 
  let parsedData=JSON.parse(data.body);
  let index=0;
  let sparklineObj={};  
  sparklineObj.timeStamp=Date.now();
  sparklineObj.midPrice=(parsedData.bestAsk+parsedData.bestBid)/2;
  if(currencyPairData.length>0) {
      index=currencyPairData.findIndex((item)=>{
      return item.parsedData.name==parsedData.name;
    })
    if(index>-1) {
     currencyPairData[index].parsedData=parsedData;
     if(!currencyPairData[index].sparklineData)
       currencyPairData[index].sparklineData=[];
     currencyPairData[index].sparklineData.push(sparklineObj);
    }
    else {
     currencyPairData.push({
       parsedData:parsedData,
       sparklineData:[sparklineObj]
     })
    }
  }
  else {
    currencyPairData.push({
      parsedData:parsedData,
      sparklineData:[sparklineObj]
    })
  }  
  currencyPairData.sort(function(a,b) {
    return a.parsedData.lastChangeBid-b.parsedData.lastChangeBid;
  })
  return currencyPairData;
}

exports.updateTable=updateTable;
exports.insertRowToTable=insertRowToTable;
exports.filterByTimeStamp=filterByTimeStamp;
exports.currencyPairData=currencyPairData;
exports.returnMidPriceAsArray=returnMidPriceAsArray;
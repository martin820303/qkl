const fetch  = require('node-fetch')
const url = "https://api.thegraph.com/subgraphs/name/aave/protocol";
const walletAddress = '0x30eb4c1a534351662c1ae273b8986862b60fa079';

// fetch(url,{
//     method:'POST',
//     headers:{
//                 'Content-Type':'application/json',
//                 'Accept':'application/json',
//     },
//     body:JSON.stringify({'query':'{reserves{id}}'}),
// }).then(res=>res.json())
// .then(data=>{
//     console.log(data.data.reserves)
// })

// fetch(url,params)
// .then(res=>res.json())
// .then(data=>{
//     console.log(data.data.reserves)
// })

function getParam(query){
    var headers = new Object();
    headers['Content-Type'] = "application/json";
    headers['Accept'] = 'application/json'

    const queryStr = JSON.stringify({'query':query});
    const params = {method:'POST',headers:headers,body:queryStr}
    console.log(params)

    return params
}

async function fe(params){
    return await fetch(url,params).catch(e=>{
        throw Error(e.mssage)
    }).then(res=>res.json())
}

function getDeposits(){
    return "{deposits(where:{user:\""+walletAddress+"\"}){"+
        "id\n"+
        "amount\n"+
        "timestamp\n"+
        "reserve{\n"+
          "symbol\n"+
          "id\n"+
          "liquidityRate\n"+
       "}"+
      "}}"
}
function getDeposits_new(){
    return '{'+
        'userReserves(where:{user:"'+walletAddress+
        '",principalATokenBalance_not:"0"'+
        '}){'+
        'id\n'+
        'reserve{\n'+
        'id\n'+
        'symbol\n'+
        'liquidityRate\n'+
        'price{'+
        'priceInEth\n'+
        'oracle{'+
        'usdPriceEth\n'+
        'lastUpdateTimestamp\n'+
        '}'+
        'lastUpdateTimestamp\n'+
        '}'+
        '}'+
        'principalATokenBalance\n'+
        'lastUpdateTimestamp\n'+
        '}'+
      '}'
}
function getLend(){
    return '{'+
        'userReserves(where:{user:"'+walletAddress+
        '",principalBorrows_not:"0",principalATokenBalance:"0"'+
        '}){'+
        'id\n'+
        'reserve{\n'+
        'id\n'+
        'symbol\n'+
        'variableBorrowRate\n'+
        'price{'+
        'priceInEth\n'+
        'oracle{'+
        'usdPriceEth\n'+
        'lastUpdateTimestamp\n'+
        '}'+
        'lastUpdateTimestamp\n'+
        '}'+
        '}'+
        'user{'+
        'borrowedReservesCount\n'+
        '}'+
        'borrowRateMode\n'+
        'principalBorrows\n'+
        'lastUpdateTimestamp\n'+
        '}'+
      '}'
}
function deposits(){
    query = getDeposits_new()
    params = getParam(query)
    fe(params).then(result=>{
        console.log(result.data)
    })
}
deposits()

function lend(){
    query=getLend()
    params=getParam(query)
    fe(params).then(result=>{
        console.log(result.data)
    })
}

// lend()
'use strict'
const  Maker = require('@makerdao/dai');
const { McdPlugin ,DAI } = require('@makerdao/dai-plugin-mcd');
const ownerAddress = '0x30eb4c1a534351662c1ae273b8986862b60fa079';

const url = 'https://mainnet.infura.io/v3/17a6d775965747309d2ecc73eb7b37ab';



async function first(){
    const maker =  await Maker.create('http',{
        plugins: [McdPlugin],
        url: url
    });
    const manager = maker.service('mcd:cdpManager');
    const service  = maker.service('mcd:savings');
    

    const proxyAddress= maker.service('proxy').getProxyAddress(ownerAddress);
    proxyAddress.then(a=>{
        const data =  manager.getCdpIds(a);
        
        // console.log(dd)
        data.then(xs=>{
            xs.forEach(x=>{
                const vault =  manager.getCdp(x.id);

                vault.then(x=>{
                    console.log(x.ilk)
                    console.log(x.collateralAmount._amount)//此款代币抵押的数量
                    console.log(x.collateralValue._amount)//此抵押代币的美元价值
                    console.log(x.debtValue._amount);//此代币的借款dai的数量
                    // console.log(x.collateralizationRatio._amount);//USD/DAI
                    // console.log(x.liquidationPrice._amount);//USD/WBTC
                    // const dai = DAI(x.debtValue._amount)
                    // const price = USD_DAI(x.collateralizationRatio._amount)
                    // const usd = dai.times(x.collateralizationRatio._amount);
                    // console.log(dai.type('wei'))
                //                 x.reset();
                // x.prefetch();
                // for(var ab in x){
                //     if(x.ab!=null)
                //     console.log(ab)
                // }
                // x.getUrn().then(x=>{
                //     console.log("urn:"+x)
                // })
                // x.getOwner().then(x=>{
                //     console.log("owner:"+x)
                // })
                // console.log(x)
                });
                   
            })
                      
        }).catch(err=>{
            console.error(err)
        })
    }).catch(err=>{
        console.error(err);
    })

    
// const data = await manager.getCdpIds(proxyAddress).then(a=>{
//     console.log(a)
// }).catch(err =>{
//     console.log(err)
// }); 
// console.log(data)
// const vault = await manager.getCdp(data[0].id);

// console.log([
//     vault.collateralAmount,
//     vault.collateralValue, 
//     vault.debtValue,       
//     vault.collateralizationRatio, 
//     vault.liquidationPrice  
//   ].map(x => x.toString()));
}

first()


async function second(){
    const maker =  await Maker.create('http',{
        plugins: [McdPlugin],
        url: url
    });
    
    const service  = maker.service('mcd:savings');
   
    // console.log(service)
    service.getTotalDai().then(x=>{
        console.log(x)//所有dai的数量，在平台上所有的dai
    })
    service.getYearlyRate().then(x=>{
        console.log("year rate"+x)//年利率
    })
    service.balanceOf(ownerAddress).then(x=>{
        console.log('own:'+x._amount)//这个账户上的dai余额
    })
    service.getEventHistory(ownerAddress).then(x=>{
        console.log("Event:"+x)
    })   
}
// second();

async function three() {
    const maker =  await Maker.create('http',{
        plugins: [McdPlugin],
        url: url
    });
    const service = maker.service('mcd:cdpType');
    service.cdpTypes.forEach(type => console.log(type.ilk+"=="+type.price))
    // console.log(service.cdpTypes[0].ilk)

}

// three()

async function four(){
    const maker =  await Maker.create('http',{
        plugins: [McdPlugin],
        url: url
    });
    // maker.getToken('DAI').balanceOf(ownerAddress).then(x=>{
    //     console.log(x)
    // })
    // const dai = maker.service('token').getToken('DAI');
    // const balanceDAI = await dai.balanceOf(ownerAddress);//DAI余额，这个账户的余额
    // console.log('DAI balance:'+balanceDAI);
    // const wbtc = maker.service('token').getToken('WBTC');
    // const balanceWBTC = await wbtc.balanceOf(ownerAddress);
    // console.log('WBTC balance:'+balanceWBTC);
}

// four()

async function five(){
    const maker =  await Maker.create('http',{
        plugins: [McdPlugin],
        url: url
    });

    const cdpType  = maker.service('mcd:cdpType')
    cdpType.cdpTypes.forEach(type => console.log(type.price))//代币 汇率
    // const a=cdpType.getCdpType(null,'ETH-A')
    // console.log(a)

}
// five()
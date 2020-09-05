// deposits(where:{user:""}){
//     id
//     amount
//     timestamp
//     reserve{
//         symbol
//     }
// }
const Web3 = require("web3")
const LendingPoolAddressesProviderABI = require('./abi/aave/LendingPoolAddressesProvider.json')
const LendingPoolABI = require('./abi/aave/LendingPool.json')

const ownerAddress = '0x30eb4c1a534351662c1ae273b8986862b60fa079';
const url = 'https://mainnet.infura.io/v3/17a6d775965747309d2ecc73eb7b37ab';
const lpAddressProviderAddress = '0x24a42fD28C976A61Df5D00D0599C34c4f90748c8' // mainnet address, for other addresses: https://docs.aave.com/developers/developing-on-aave/deployed-contract-instances

const web3 = new Web3(
    new Web3.providers.HttpProvider(url)
  );

const lpAddressProviderContract = new web3.eth.Contract(LendingPoolAddressesProviderABI, lpAddressProviderAddress)



    
    
    const lpAddress=lpAddressProviderContract.methods
    .getLendingPool()
    .call()
    .catch((e) => {
        throw Error(`Error getting lendingPool address: ${e.message}`)
    })
    

lpAddress.catch(e=>{
    throw Error(`lpAddress Error :${e.message}`)
}).then(address=>{
   const lpContract = new web3.eth.Contract(LendingPoolABI,address);
//    console
    lpContract.methods.getReserveConfigurationData(ownerAddress).call().
    then(x=>{
        // console.log(x.isActive)
    })
    // console.log(lpContract.methods.getReserveData(ownerAddress))
    lpContract.methods.getUserAccountData(ownerAddress).call().
    catch(e=>{
        throw Error(`getUserAccountData Error :${e.message}`)
    })
   
    lpContract.methods.getReserves().call().
    catch(e=>{
        throw Error(`getReserves Error :${e.message}`)
    }).then(x=>{
        x.forEach(address => {
            lpContract.methods.getUserReserveData(address,ownerAddress).call().
            then(x=>{
                // console.log(`timestamp:${x.lastUpdateTimestamp}`)
                // console.log(`currentATokenBalance:${x.currentATokenBalance}`)
                // console.log(x.borrowRate)
                // console.log(`liquidityRate: ${x.liquidityRate}`)
            })
        });
    })
    lpContract.methods.getUserReserveData("0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",ownerAddress)
.call().then(x=>{
    console.log(`timestamp:${x.lastUpdateTimestamp}`)
    console.log(`currentATokenBalance:${x.currentATokenBalance}`)
    console.log(x.borrowRate)
    console.log(`liquidityRate: ${x.liquidityRate}`)
})
})


const IPriceOracleABI = require('./abi/aave/IPriceOracleGetter.json')
const priceOracleAddress = lpAddressProviderContract.methods.
    getPriceOracle().
    call()
    .catch(e=>{
        throw Error(`priceOracleAddress:${e.message}`)
    })
const  daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f"

priceOracleAddress.then(x=>{
    console.log(x)
    // const lpContract = new web3.eth.Contract(IPriceOracleABI,x);
    const priceOracleContract = new web3.eth.Contract(IPriceOracleABI,x)
    priceOracleContract.methods.getAssetPrice(daiAddress).call()
    .then(x=>{
        // console.log(x)
    })
})


// const aMKRTokenAddress="0x7deB5e830be29F91E298ba5FF1356BB7f8146998";
// const AMKRTokenABI = require('./abi/aave/AMkrToken.json')
// const aMKRContract = new web3.eth.Contract(AMKRTokenABI, aMKRTokenAddress)

// const abc=aMKRContract.methods.balanceOf(ownerAddress)
// console.log(abc)

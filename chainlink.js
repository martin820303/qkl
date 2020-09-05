const Web3 = require("web3")
const eth_usd_address="0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
const ownerAddress = '0x30eb4c1a534351662c1ae273b8986862b60fa079';
const url = 'https://mainnet.infura.io/v3/17a6d775965747309d2ecc73eb7b37ab';

const web3 = new Web3(
    new Web3.providers.HttpProvider(url)
  );

  const EthUsdABI = require('./abi/chainlink/eth_usd.json')

  const EthUsdContract = new web3.eth.Contract(EthUsdABI, eth_usd_address)

  EthUsdContract.methods.latestRoundData().call().then(x=>{
      console.log("lastest round data",x)
  })


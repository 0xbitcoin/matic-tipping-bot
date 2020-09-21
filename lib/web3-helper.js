const tokenContractABI = require('../abi/ERC20.json')
const tipjarContractABI = require('../abi/TippingJar.json')


const contractData = require('../contracts/contractdata.js')

const config = require("../config.json");


var Web3 = require('web3')

let web3 = new Web3(config.WEB3_PROVIDER);

module.exports = {

  async init()
  {

  },

  async getTipjarTokensBalance( tokenAddress, ownerAddress)
  {


    //query the tipjar contract
    var tipjarContract = await this.getTipjarContract();

    console.log('meep',tokenAddress,ownerAddress)

    var balance = await new Promise((resolve, reject) => {
      //tipjarContract.methods.getBalance( tokenAddress , ownerAddress).call();

      var balance = tipjarContract.methods.getBalance( tokenAddress , ownerAddress).call( {}  )
      .then(function(result){
        resolve(result);
      });
    });


  //  var contractAddress = contractData.contracts.matic_network.TippingJar.address;


    //var tipjarContract = new web3.eth.Contract(tipjarContractABI, contractAddress, {});


  //  var balance = await tipjarContract.methods.getBalance(tokenAddress,ownerAddress).call();

    return balance;
  },

  async getTokenContract( contractAddress )
  {

  //  var tokenContract =  web3.eth.contract(tokenContractABI).at(contractAddress)
   var tokenContract = new web3.eth.Contract(tokenContractABI, contractAddress, {});

    return tokenContract;
  },

  async getTipjarContract()
  {

    var contractAddress = await this.getTipjarContractAddress()

    var tipjarContract = new web3.eth.Contract(tipjarContractABI, contractAddress, {});


//    var tokenContract =  web3.eth.contract(tipjarContractABI).at(contractAddress)

    return tipjarContract;
  },

  async getTipjarContractAddress()
  {

    var contractAddress = contractData.contracts.matic_network.TippingJar.address;


    return contractAddress;
  }

}

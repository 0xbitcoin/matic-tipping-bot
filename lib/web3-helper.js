

const contractData = require('../contracts/contractdata.js')

const config = require("../config.json");


var Web3 = require('web3')

let web3 = new Web3(config.INFURA.URL);


module.exports = {

  async init()
  {

  },

  async getTipjarTokensBalance( tokenAddress, ownerAddress)
  {


    //query the tipjar contract
    var tipjarContract = await this.getTipjarContract();

    var balance = await new Promise((resolve, reject) => {
      tipjarContract.getBalance( tokenAddress ,address , function(response){

        resolve(response);
      })
    });


  //  var contractAddress = contractData.contracts.matic_network.TippingJar.address;


    //var tipjarContract = new web3.eth.Contract(tipjarContractABI, contractAddress, {});


  //  var balance = await tipjarContract.methods.getBalance(tokenAddress,ownerAddress).call();

    return balance;
  },

  async getTokenContract( contractAddress, fromAddress)
  {

    var tokenContract =  web3.eth.contract(tokenContractABI).at(contractAddress)

    return tokenContract;
  },

  async getTipjarContract()
  {

    var contractAddress = await this.getTipjarContractAddress()

    var tokenContract =  web3.eth.contract(tipjarContractABI).at(contractAddress)

    return tokenContract;
  },



}

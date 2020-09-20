
const config = require("./config.json");


var Web3 = require('web3')

let web3 = new Web3(config.INFURA.URL);


module.exports = {

  async init()
  {

  },

  async getTipjarContract()
  {
    //copy code from the dapp 
  }



}

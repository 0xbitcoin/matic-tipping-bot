
const mongojs = require('mongojs')


const config = require("./config.json");


var Web3 = require('web3')

let web3 = new Web3(config.INFURA.URL);

const mongoInterface = require('./mongo-interface')



const Web3Helper = require('./web3-helper.js');



module.exports = {

  async init()
  {
    mongoInterface.init('ethwalletbot')
  },

  async getETHAccount()
  {
    //.PUBLIC_ADDRESS .PRIVATE_KEY
     return config.ETH_ACCT
  },


  async generateNewWallet(uid){
    var acct = web3.eth.accounts.create();

    await mongoInterface.insertOne('wallets',{uid: uid, acct: acct})
    //save to mongo

    return acct;
  },

  async deleteWallet(uid){


   var result =   await mongoInterface.deleteMany('wallets',{uid: uid})
    //save to mongo

    return  result;
  },


  async findExistingWalletByUserID(uid)
  {
    //find in mongo
    //var result = await db.ethwallets.findOne({uid:uid})
    var result = await mongoInterface.findOne('wallets',{uid: uid})


      return result;
  }

  async getCurrentBalanceByUserID(uid)
  {
      var wallet = await findExistingWalletByUserID(uid);
      var address = wallet.address;

      var tokenAddress = config.TOKEN_ADDRESS;

      //query the tipjar contract
      var tipjarContract = await Web3Helper.getTipjarContract();

      var balance = await new Promise((resolve, reject) => {
        tipjarContract.getBalance( tokenAddress ,address , function(response){

          resolve(response);
        })
      });

      console.log('got balance of ', balance );
       return balance;




  }

  async sendTip(senderUid, recipientUsername, amount)
  {
    console.log('sending tip..',senderUid, recipientUsername,amount )
  }



}

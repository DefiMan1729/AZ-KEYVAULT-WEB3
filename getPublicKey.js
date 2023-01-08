var Web3 = require('web3');
var web3 = new Web3('http://localhost:1945');
const pubkey= web3.eth.accounts.privateKeyToAccount('0xc6c513b14962069bba26de6ef7d2269ba6b34c48fd030a248f854d1253ecfc10');
console.log(pubkey);
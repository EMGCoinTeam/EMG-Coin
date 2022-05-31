# emg-smartcontract

EMG Coin will be used throughout the EMG ecosystem as the basis of transactions. The initial supply of EMG Coin is 500 000 000 and max supply is 800 000 000. After 2 years the smart contract will unlock 300 000 000 where the owner can call a function to mint the 300 000 000 tokens. EMG Coin has a function of burning the tokens. 500 000 000 tokens have been transferred to 5 hardware wallets for security reasons.

## Local environment preparation
Required tools:
- **npm**, see e.g. https://phoenixnap.com/kb/install-node-js-npm-on-windows
- **Truffle**: `npm i -g truffle`
- **Ganache**: `npm i -g ganache-cli`

Recommended development IDE: **Microsoft visual studio code** with optional plugins
- solidity
- npm
- json
- Ethereum Remix

## Local development

Build & test
- `npm install`
- `truffle compile`
- `truffle test`

How to try on local:
- `ganache-cli`
- `truffle migrate`
- `truffle console`

Now you're ready to test your smart contract:
- check the deployed contract name
  - `EmeldiToken.deployed().then((x) => {contract=x})`   <<<< this is important to run always
  - `contract.name().then((b) => { x = b })`
  - `x`
- check total supply
  - `contract.totalSupply().then((b) => { x = b })`
  - `x.toString()`
- check balance
  - `let accounts = await web3.eth.getAccounts()`
  - `contract.balanceOf(accounts[0]).then((b) => {x = b})`
  - `x.toString()`
- transfer
  - `contract.transfer(accounts[1], 1000)`
  - `contract.balanceOf(accounts[0]).then((b) => {x = b})`
  - `x.toString()`
  - `contract.balanceOf(accounts[1]).then((b) => {x = b})`
  - `x.toString()`
- mint additional
  - `contract.mintAdditional(1)` ... fails on "Too early"
  - `await web3.currentProvider.send({jsonrpc: "2.0", method: "evm_increaseTime", params: [63072000], id: new Date().getTime()}, () => { })` ... shift time by 2 years
  - `contract.mintAdditional(300000001)` ... fails on "Too much"


## How to deploy

Steps:
- install MetaMask and create a wallet
- infura.io 
- `truffle migrate --network matic`

### Verify EmeldiToken contract

- `truffle run verify EmeldiToken --network matic`
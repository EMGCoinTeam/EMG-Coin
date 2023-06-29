# emg-smartcontract

EMG Coin will be used throughout the EMG ecosystem as the basis of transactions. The initial supply of EMG Coin is 300 000 000. EMG Coin has a function of burning the tokens. All tokens have been transferred to hardware wallets for security reasons.

## Local environment preparation
Required tools:
- **npm**
- **Truffle**: `npm i -g truffle`
- **Ganache**: `npm i -g ganache`

Recommended development IDE: **Microsoft visual studio code** with optional plugins
- solidity
- npm
- json

## Local development

Build & test
- `npm install`
- `truffle compile`
- `truffle test`

How to try on local:
- `ganache`
- `truffle migrate`
- `truffle console`

Now you're ready to test your smart contract:
- check the deployed contract name
  - `EmeldiGroup.deployed().then((x) => {contract=x})`   <<<< this is important to run always
  - `contract.name()`
- check total supply
  - `contract.totalSupply().then((b) => { x = b })`
  - `x.toString()`
- check balance
  - `let accounts = await web3.eth.getAccounts()`
  - `accounts[0]` << the owner account
  - `contract.balanceOf(accounts[0]).then(x => x.toString())`
- transfer
  - `contract.transfer(accounts[1], 1000)`
  - `contract.balanceOf(accounts[0]).then(x => x.toString())`
  - `contract.balanceOf(accounts[1]).then(x => x.toString())`

## How to deploy

Steps:
- install MetaMask and create a wallet
- `truffle migrate --network matic`

### Verify contract

- `truffle run verify EmeldiGroup --network matic`
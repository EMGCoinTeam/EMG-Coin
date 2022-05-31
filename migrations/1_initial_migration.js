// required by Truffle, see
// https://trufflesuite.com/docs/truffle/getting-started/running-migrations/#initial-migration

const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
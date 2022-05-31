var EmeldiToken = artifacts.require("EmeldiToken");

module.exports = function(deployer) {
  deployer.deploy(EmeldiToken);
};
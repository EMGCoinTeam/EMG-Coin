const { expect } = require("chai");
const { BN, expectRevert, time } = require('@openzeppelin/test-helpers');

const EmeldiToken = artifacts.require("EmeldiToken");

const YEAR_SECONDS = 365 * 24 * 3600;
const INITIAL_BALANCE = '500000000000000000000000000';
const     MAX_BALANCE = '800000000000000000000000000';

// Start test block
contract("EmeldiToken-supply", ([owner, other1, other2]) => {

  before(async () => {
    this.EmeldiTokenInstance = await EmeldiToken.new({
      from: owner
    });

    // https://github.com/itinance/ncd-token/blob/master/test/NCDTokenSaleTeamTokens.js
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await time.advanceBlock();
  });

  // --------------------------------------
  // Tests
  // --------------------------------------

  it("has proper inital supply", async () => {
    expect(
      await this.EmeldiTokenInstance.totalSupply()
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it('fails to mint too much', async () => {
    expectRevert(
      this.EmeldiTokenInstance.mintAdditional(new BN('300000001')),
      'Too much'
    );
  });

  it("has proper inital supply", async () => {
    expect(
      await this.EmeldiTokenInstance.totalSupply()
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it('fails to mint too early', async () => {
    expectRevert(
      this.EmeldiTokenInstance.mintAdditional(new BN('300000000')),
      'Too early'
    );
  });

  it("has proper inital supply", async () => {
    expect(
      await this.EmeldiTokenInstance.totalSupply()
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it('fails to mint too early - before 2 yers', async () => {
    await time.increase(2*YEAR_SECONDS - 24 * 3600);  // Increases the time of the blockchain by duration (in seconds), and mines a new block with that timestamp.
    expectRevert(
      this.EmeldiTokenInstance.mintAdditional(new BN('300000000')),
      'Too early'
    );
  });

  it("has proper inital supply", async () => {
    expect(
      await this.EmeldiTokenInstance.totalSupply()
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it('mints additionally', async () => {
    await time.increase(2 * 24 * 3600);  // shift additionally by 2 days
    await this.EmeldiTokenInstance.mintAdditional(new BN('300000000'));
  });

  it("has proper final supply", async () => {
    expect(
      await this.EmeldiTokenInstance.totalSupply()
    ).to.be.bignumber.equal(MAX_BALANCE);
  });

});
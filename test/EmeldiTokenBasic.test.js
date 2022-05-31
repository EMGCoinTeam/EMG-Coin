const { expect } = require("chai");
const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const EmeldiToken = artifacts.require("EmeldiToken");

const INITIAL_BALANCE = '500000000000000000000000000';

// Start test block
contract("EmeldiToken", ([owner, other1, other2]) => {

  before(async () => {
    this.EmeldiTokenInstance = await EmeldiToken.new({
      from: owner
    });
  });

  // --------------------------------------
  // Test contract setup
  // --------------------------------------

  it("has proper token name", async () => {
    expect(
      await this.EmeldiTokenInstance.name()
    ).to.equal('EMG Coin');
  });

  it("has proper token symbol", async () => {
    expect(
      await this.EmeldiTokenInstance.symbol()
    ).to.equal('EMG');
  });

  // --------------------------------------
  // Test balance
  // --------------------------------------

  it("owner has proper balance", async () => {
    expect(
      await this.EmeldiTokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it("others have zero balance", async () => {
    expect(
      await this.EmeldiTokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('0');
    expect(
        await this.EmeldiTokenInstance.balanceOf(other2)
      ).to.be.bignumber.equal('0');
  });

  // --------------------------------------
  // Test transfes - no fee
  // --------------------------------------

  it('updates balances on successful transfer: owner -> other1', async () => {
    await this.EmeldiTokenInstance.transfer(other1, new BN(1000000), { from: owner });
    expect(
      await this.EmeldiTokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal('499999999999999999999000000');
    expect(
      await this.EmeldiTokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('1000000');
    expect(
      await this.EmeldiTokenInstance.balanceOf(other2)
    ).to.be.bignumber.equal('0');
  });

  it('updates balances on successful transfer back to owner', async () => {
    // note: cannot transfer whole 1000000, it is not allowed by ERC20
    await this.EmeldiTokenInstance.transfer(owner, new BN(999999), { from: other1 });
    expect(
      await this.EmeldiTokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal('499999999999999999999999999');
    expect(
      await this.EmeldiTokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('1');
    expect(
      await this.EmeldiTokenInstance.balanceOf(other2)
    ).to.be.bignumber.equal('0');
  });

});
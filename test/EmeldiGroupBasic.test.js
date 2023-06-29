const { expect } = require("chai");
const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const Token = artifacts.require("EmeldiGroup");

const INITIAL_BALANCE = '300000000000000000000000000';

// Start test block
contract("EmeldiGroup", ([owner, other1, other2]) => {

  before(async () => {
    this.TokenInstance = await Token.new({
      from: owner
    });
  });

  // --------------------------------------
  // Test contract setup
  // --------------------------------------

  it("has proper token name", async () => {
    expect(
      await this.TokenInstance.name()
    ).to.equal('EMG SuperApp');
  });

  it("has proper token symbol", async () => {
    expect(
      await this.TokenInstance.symbol()
    ).to.equal('EMGS');
  });

  // --------------------------------------
  // Test balance
  // --------------------------------------

  it("has proper inital supply", async () => {
    expect(
      await this.TokenInstance.totalSupply()
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it("owner has proper balance", async () => {
    expect(
      await this.TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal(INITIAL_BALANCE);
  });

  it("others have zero balance", async () => {
    expect(
      await this.TokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('0');
    expect(
        await this.TokenInstance.balanceOf(other2)
      ).to.be.bignumber.equal('0');
  });

  // --------------------------------------
  // Test transfes - no fee
  // --------------------------------------

  it('updates balances on successful transfer: owner -> other1', async () => {
    await this.TokenInstance.transfer(other1, new BN(1000000), { from: owner });
    expect(
      await this.TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal('299999999999999999999000000');
    expect(
      await this.TokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('1000000');
    expect(
      await this.TokenInstance.balanceOf(other2)
    ).to.be.bignumber.equal('0');
  });

  it('updates balances on successful transfer back to owner', async () => {
    // note: cannot transfer whole 1000000, it is not allowed by ERC20
    await this.TokenInstance.transfer(owner, new BN(999999), { from: other1 });
    expect(
      await this.TokenInstance.balanceOf(owner)
    ).to.be.bignumber.equal('299999999999999999999999999');
    expect(
      await this.TokenInstance.balanceOf(other1)
    ).to.be.bignumber.equal('1');
    expect(
      await this.TokenInstance.balanceOf(other2)
    ).to.be.bignumber.equal('0');
  });

});
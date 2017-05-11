var BrokenToken   = artifacts.require("BrokenToken");
var Recipient     = artifacts.require("Recipient");
var EvilRecipient = artifacts.require("EvilRecipient");

contract('BrokenToken', function(accounts) {
  it("should give you tokens equal to your deposit", function(done) {
    var token;

    BrokenToken.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 1000);
        done();
      }).catch(done);
  });

  it("should let you transfer tokens", function(done) {
    var token;

    BrokenToken.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(accounts[1], 100) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 900);
      }).
      then(function() { return token.balanceOf(accounts[1]) }).
      then(function(result) {
        assert.equal(result, 100);
        done();
      }).catch(done);
  });

  it("should let you withdraw", function(done) {
    var token;
    var recipient;

    BrokenToken.new().
      then(function(result) { token = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(recipient.address, 500) }).
      then(function() { return recipient.callWithdraw(token.address); }).
      then(function() { return token.balanceOf(recipient.address) }).
      then(function(result) {
        assert.equal(result.valueOf(), 0);
        assert.equal(web3.eth.getBalance(recipient.address).valueOf(), 500);
        done();
      }).catch(done);
  });


  it("should let you claim more tokens than you deserve", function(done) {
    var token;

    BrokenToken.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(2000, {value: 1000}) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 2000);
        assert.equal(web3.eth.getBalance(token.address), 1000);
        done();
      }).catch(done);
  });

  it("should let you do reentry attack", function(done) {
    var token;
    var evil_recipient;

    BrokenToken.new().
      then(function(result) { token = result }).
      then(function() { return EvilRecipient.new(); }).
      then(function(result) { evil_recipient = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(evil_recipient.address, 1) }).
      then(function() { return evil_recipient.callWithdraw(token.address); }).
      then(function() {
        assert.isAbove(web3.eth.getBalance(evil_recipient.address), 1);
        assert.isBelow(web3.eth.getBalance(token.address), 999);
        done();
      }).catch(done);
  });
});

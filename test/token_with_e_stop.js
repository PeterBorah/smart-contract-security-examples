var TokenWithEStop   = artifacts.require("TokenWithEStop");
var Recipient        = artifacts.require("Recipient");

contract('TokenWithEStop', function(accounts) {
  it("should give you tokens equal to your deposit", function(done) {
    var token;

    TokenWithEStop.new(accounts[1]).
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

    TokenWithEStop.new(accounts[1]).
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

  it("should let admin hit the emergency stop", function(done) {
    var token;

    TokenWithEStop.new(accounts[1]).
      then(function(result) { token = result }).
      then(function() { return token.emergencyStop({from: accounts[1]}) }).
      then(function() { return token.stopped() }).
      then(function(result) {
        assert.equal(result, true);
        done();
      }).catch(done);
  });

  it("should prevent deposits after emergency stop", function(done) {
    var token;

    TokenWithEStop.new(accounts[1]).
      then(function(result) { token = result }).
      then(function() { return token.emergencyStop({from: accounts[1]}) }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 0);
        done();
      }).catch(done);
  });

  it("should prevent transfers after emergency stop", function(done) {
    var token;

    TokenWithEStop.new(accounts[1]).
      then(function(result) { token = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.emergencyStop({from: accounts[1]}) }).
      then(function() { return token.transfer(accounts[1], 100) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 1000);
      }).
      then(function() { return token.balanceOf(accounts[1]) }).
      then(function(result) {
        assert.equal(result, 0);
        done();
      }).catch(done);
  });

  it("should let you withdraw in emergency", function(done) {
    var token;
    var recipient;

    TokenWithEStop.new(accounts[1]).
      then(function(result) { token = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(recipient.address, 500) }).
      then(function() { return token.emergencyStop({from: accounts[1]}) }).
      then(function() { return recipient.callWithdraw(token.address); }).
      then(function() { return token.balanceOf(recipient.address) }).
      then(function(result) {
        assert.equal(result, 0);
        assert.equal(web3.eth.getBalance(token.address), 500);
        done();
      }).catch(done);
  });
});

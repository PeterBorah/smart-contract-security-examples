var CircuitBreaker = artifacts.require("CircuitBreaker");
var Recipient      = artifacts.require("Recipient");

contract('CircuitBreaker', function(accounts) {
  it("should transfer ether", function(done) {
    var circuit_breaker;
    var recipient;

    var test = function() {
      circuit_breaker.transfer(100, recipient.address).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 100);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 900);
          done();
        }).catch(done);
    }

    CircuitBreaker.new(accounts[1], accounts[0], 3, 500).
      then(function(result) { circuit_breaker = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return web3.eth.sendTransaction({from: accounts[0], to: circuit_breaker.address, value: 1000}, test) }).
      catch(done);
  });

  it("should wait the specified number of blocks to transfer more than the limit", function(done) {
    var circuit_breaker;
    var recipient;

    var test = function() {
      circuit_breaker.transfer(600, recipient.address).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 600);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 400);
          done();
        }).catch(done);
    }

    CircuitBreaker.new(accounts[1], accounts[0], 3, 500).
      then(function(result) { circuit_breaker = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return web3.eth.sendTransaction({from: accounts[0], to: circuit_breaker.address, value: 1000}, test) }).
      catch(done);
  });

  it("should wait the specified number of blocks for cumulative transfers over the limit", function(done) {
    var circuit_breaker;
    var recipient;

    var test = function() {
      circuit_breaker.transfer(300, recipient.address).
        then(function() { return circuit_breaker.transfer(400, recipient.address); }).
        then(function() { return circuit_breaker.currentPeriodAmount() }).
        then(function(result) {
          assert.equal(result, 300);
          assert.equal(web3.eth.getBalance(recipient.address), 300);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 700);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(1) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 300);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 700);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(1) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 300);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 700);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(1) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 300);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 700);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(1) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 700);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 300);
          done();
        }).catch(done);
    }

    CircuitBreaker.new(accounts[1], accounts[0], 4, 500).
      then(function(result) { circuit_breaker = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return web3.eth.sendTransaction({from: accounts[0], to: circuit_breaker.address, value: 1000}, test) }).
      catch(done);
  });

  it("should allow the curator to block pending transfers", function(done) {
    var circuit_breaker;
    var recipient;

    var test = function() {
      circuit_breaker.transfer(600, recipient.address).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
        }).
        then(function() { return circuit_breaker.stopTransfer(0, {from: accounts[1]}); }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1000);
          done();
        }).catch(done);
    }

    CircuitBreaker.new(accounts[1], accounts[0], 3, 500).
      then(function(result) { circuit_breaker = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return web3.eth.sendTransaction({from: accounts[0], to: circuit_breaker.address, value: 1000}, test) }).
      catch(done);
  });

  it("should not allow transfers to be double-sent", function(done) {
    var circuit_breaker;
    var recipient;

    var test = function() {
      circuit_breaker.transfer(600, recipient.address).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1200);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1200);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 0);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 1200);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 600);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 600);
        }).
        then(function() { return circuit_breaker.releasePendingTransfer(0) }).
        then(function() {
          assert.equal(web3.eth.getBalance(recipient.address), 600);
          assert.equal(web3.eth.getBalance(circuit_breaker.address), 600);
          done();
        }).catch(done);
    }

    CircuitBreaker.new(accounts[1], accounts[0], 3, 500).
      then(function(result) { circuit_breaker = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return web3.eth.sendTransaction({from: accounts[0], to: circuit_breaker.address, value: 1200}, test) }).
      catch(done);
  });
});

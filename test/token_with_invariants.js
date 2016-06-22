contract('TokenWithInvariants', function(accounts) {
  it("should give you tokens equal to your deposit", function(done) {
    var token;

    TokenWithInvariants.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.balanceOf(accounts[0]) }).
      then(function(result) {
        assert.equal(result, 1000);
        done();
      }).catch(done);
  });

  it("should update the totalSupply", function(done) {
    var token;

    TokenWithInvariants.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.totalSupply() }).
      then(function(result) {
        assert.equal(result, 1000);
        done();
      }).catch(done);
  });

  it("should let you transfer tokens", function(done) {
    var token;

    TokenWithInvariants.new().
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

    TokenWithInvariants.new().
      then(function(result) { token = result }).
      then(function() { return Recipient.new(); }).
      then(function(result) { recipient = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(recipient.address, 500) }).
      then(function() { return recipient.callWithdraw(token.address); }).
      then(function() { return token.balanceOf(recipient.address) }).
      then(function(result) {
        assert.equal(result, 0);
        assert.equal(web3.eth.getBalance(token.address), 500);
        done();
      }).catch(done);
  });

  it("should not let you deposit in a way that breaks invariants", function(done) {
    var token;

    TokenWithInvariants.new().
      then(function(result) { token = result }).
      then(function() { return token.deposit(2000, {value: 1000}) }).
      then(assert.fail, function(err) { done(); }).
      catch(done);
  });

  it("should not let you do reentry attack", function(done) {
    var token;
    var evil_recipient;

    TokenWithInvariants.new().
      then(function(result) { token = result }).
      then(function() { return EvilRecipient.new(); }).
      then(function(result) { evil_recipient = result }).
      then(function() { return token.deposit(1000, {value: 1000}) }).
      then(function() { return token.transfer(evil_recipient.address, 1) }).
      then(function() { return evil_recipient.callWithdraw(token.address); }).
      then(function() {
        assert.equal(web3.eth.getBalance(evil_recipient.address), 0);
        assert.equal(web3.eth.getBalance(token.address), 1000);
        done();
      }).catch(done);
  });
});

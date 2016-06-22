contract('Bounty', function(accounts) {
  it("should not pay out the bounty if you don't find a bug", function(done) {
    var bounty = Bounty.deployed();

    var event = bounty.TargetCreation({});
    event.watch(function(err, result) {
      event.stopWatching();
      if (err) { throw err }

      var token = BrokenToken.at(result.args.createdAddress);

      token.deposit(1000, {value: 1000}).
        then(function() { return bounty.claimBounty(token.address) }).
        then(function() { return bounty.claimed() }).
        then(function(result) {
          assert.equal(result, false);
        }).
        then(function() { return bounty.totalBounty() }).
        then(function(result) {
          assert.equal(result, 10000);
          done();
        }).catch(done);
    });

    bounty.contribute({value: 10000}).
      then(function() { return bounty.createTarget() }).
      catch(done);
  });

  it("should pay out the bounty if you find the deposit bug", function(done) {
    var bounty = Bounty.deployed();

    var event = bounty.TargetCreation({});
    event.watch(function(err, result) {
      event.stopWatching();
      if (err) { throw err }

      var token = BrokenToken.at(result.args.createdAddress);

      token.deposit(2000, {value: 1000}).
        then(function() { return bounty.claimBounty(token.address) }).
        then(function() { return bounty.claimed() }).
        then(function(result) {
          assert.equal(result, true);
        }).
        then(function() { return bounty.totalBounty() }).
        then(function(result) {
          assert.equal(result, 0);
          done();
        }).catch(done);
    });

    bounty.contribute({value: 10000}).
      then(function() { return bounty.createTarget() }).
      catch(done);
  });
});

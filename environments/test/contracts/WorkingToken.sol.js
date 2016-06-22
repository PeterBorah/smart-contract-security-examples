// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"type":"function"}],
    binary: "6060604052610143806100126000396000f3606060405260e060020a600035046318160ddd81146100475780633ccfd60b1461005057806370a0823114610097578063a9059cbb146100af578063d0e30db014610107575b005b61013660015481565b610045600160a060020a0333166000818152602081905260408120805490829055600180548290039055919082606082818181858883f19350505050151561014057610002565b61013660043560006020819052908152604090205481565b610045600435602435600160a060020a0333166000908152602081905260409020548190106101035760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b610045600160a060020a0333166000908152602081905260409020805434908101909155600180549091019055565b6060908152602090f35b5056",
    unlinked_binary: "6060604052610143806100126000396000f3606060405260e060020a600035046318160ddd81146100475780633ccfd60b1461005057806370a0823114610097578063a9059cbb146100af578063d0e30db014610107575b005b61013660015481565b610045600160a060020a0333166000818152602081905260408120805490829055600180548290039055919082606082818181858883f19350505050151561014057610002565b61013660043560006020819052908152604090205481565b610045600435602435600160a060020a0333166000908152602081905260409020548190106101035760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b610045600160a060020a0333166000908152602081905260409020805434908101909155600180549091019055565b6060908152602090f35b5056",
    address: "",
    generated_with: "2.0.9",
    contract_name: "WorkingToken"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("WorkingToken error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("WorkingToken error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("WorkingToken error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("WorkingToken error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.WorkingToken = Contract;
  }

})();

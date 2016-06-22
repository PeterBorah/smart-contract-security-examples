// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"type":"function"}],
    binary: "606060405261013e806100126000396000f3606060405260e060020a60003504633ccfd60b811461003c57806370a082311461009f578063a9059cbb146100b7578063b6b55f251461010f575b005b61003a600160a060020a0333166000818152602081905260408120549190829060609081818185876185025a03f1925050501561009c5760006000600050600033600160a060020a03168152602001908152602001600020600050819055505b50565b61013460043560006020819052908152604090205481565b61003a600435602435600160a060020a03331660009081526020819052604090205481901061010b5760406000818120600160a060020a038086168352928220805485019055339092169052805482900390555b5050565b33600160a060020a03166000908152602081905260409020805460043501905561003a565b6060908152602090f3",
    unlinked_binary: "606060405261013e806100126000396000f3606060405260e060020a60003504633ccfd60b811461003c57806370a082311461009f578063a9059cbb146100b7578063b6b55f251461010f575b005b61003a600160a060020a0333166000818152602081905260408120549190829060609081818185876185025a03f1925050501561009c5760006000600050600033600160a060020a03168152602001908152602001600020600050819055505b50565b61013460043560006020819052908152604090205481565b61003a600435602435600160a060020a03331660009081526020819052604090205481901061010b5760406000818120600160a060020a038086168352928220805485019055339092169052805482900390555b5050565b33600160a060020a03166000908152602081905260409020805460043501905561003a565b6060908152602090f3",
    address: "",
    generated_with: "2.0.9",
    contract_name: "BrokenToken"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("BrokenToken error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("BrokenToken error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("BrokenToken error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("BrokenToken error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.BrokenToken = Contract;
  }

})();

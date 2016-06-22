// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[],"type":"function"}],
    binary: "60606040526101ad806100126000396000f3606060405260e060020a600035046318160ddd81146100475780633ccfd60b1461005057806370a08231146100da578063a9059cbb146100f2578063b6b55f251461015e575b005b61019c60015481565b610045600160a060020a0333166000818152602081905260408120549190829060609081818185876185025a03f192505050156100c25780600160008282825054039250508190555060006000600050600033600160a060020a03168152602001908152602001600020600050819055505b60015430600160a060020a031631146101a657610002565b61019c60043560006020819052908152604090205481565b610045600435602435600160a060020a0333166000908152602081905260409020548190106101465760406000818120600160a060020a038086168352928220805485019055339092169052805482900390555b60015430600160a060020a031631146101a957610002565b610045600435600160a060020a033381166000908152602081905260409020805483019055600180548301908190553090911631146101a657610002565b6060908152602090f35b50565b505056",
    unlinked_binary: "60606040526101ad806100126000396000f3606060405260e060020a600035046318160ddd81146100475780633ccfd60b1461005057806370a08231146100da578063a9059cbb146100f2578063b6b55f251461015e575b005b61019c60015481565b610045600160a060020a0333166000818152602081905260408120549190829060609081818185876185025a03f192505050156100c25780600160008282825054039250508190555060006000600050600033600160a060020a03168152602001908152602001600020600050819055505b60015430600160a060020a031631146101a657610002565b61019c60043560006020819052908152604090205481565b610045600435602435600160a060020a0333166000908152602081905260409020548190106101465760406000818120600160a060020a038086168352928220805485019055339092169052805482900390555b60015430600160a060020a031631146101a957610002565b610045600435600160a060020a033381166000908152602081905260409020805483019055600180548301908190553090911631146101a657610002565b6060908152602090f35b50565b505056",
    address: "",
    generated_with: "2.0.9",
    contract_name: "TokenWithInvariants"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithInvariants error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("TokenWithInvariants error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithInvariants error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithInvariants error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.TokenWithInvariants = Contract;
  }

})();

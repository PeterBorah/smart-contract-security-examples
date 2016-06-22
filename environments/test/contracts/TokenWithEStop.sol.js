// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"emergencyStop","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"curator","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_curator","type":"address"}],"type":"constructor"}],
    binary: "606060405260405160208061024f83395060806040525160018054600160a060020a0319168217905550610218806100376000396000f36060604052361561006c5760e060020a600035046318160ddd811461006e5780633ccfd60b1461007757806363a599a4146100d157806370a082311461011257806375f12b211461012a578063a9059cbb1461013e578063d0e30db0146101aa578063e66f53b7146101ed575b005b6101ff60025481565b61006c60015460009060ff60a060020a90910416156102155733600160a060020a03168082526020829052604082208054908390556002805482900390559182606082818181858883f19350505050151561021557610002565b61006c60015433600160a060020a0390811691161415610110576001805474ff0000000000000000000000000000000000000000191660a060020a1790555b565b6101ff60043560006020819052908152604090205481565b61020960015460ff60a060020a9091041681565b61006c60043560243560015460ff60a060020a9091041615156101a65733600160a060020a03166000908152602081905260409020548190106101a65760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b61006c60015460ff60a060020a9091041615156101105733600160a060020a03166000908152602081905260409020805434908101909155600280549091019055565b6101ff600154600160a060020a031681565b6060908152602090f35b15156060908152602090f35b5056",
    unlinked_binary: "606060405260405160208061024f83395060806040525160018054600160a060020a0319168217905550610218806100376000396000f36060604052361561006c5760e060020a600035046318160ddd811461006e5780633ccfd60b1461007757806363a599a4146100d157806370a082311461011257806375f12b211461012a578063a9059cbb1461013e578063d0e30db0146101aa578063e66f53b7146101ed575b005b6101ff60025481565b61006c60015460009060ff60a060020a90910416156102155733600160a060020a03168082526020829052604082208054908390556002805482900390559182606082818181858883f19350505050151561021557610002565b61006c60015433600160a060020a0390811691161415610110576001805474ff0000000000000000000000000000000000000000191660a060020a1790555b565b6101ff60043560006020819052908152604090205481565b61020960015460ff60a060020a9091041681565b61006c60043560243560015460ff60a060020a9091041615156101a65733600160a060020a03166000908152602081905260409020548190106101a65760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b61006c60015460ff60a060020a9091041615156101105733600160a060020a03166000908152602081905260409020805434908101909155600280549091019055565b6101ff600154600160a060020a031681565b6060908152602090f35b15156060908152602090f35b5056",
    address: "",
    generated_with: "2.0.9",
    contract_name: "TokenWithEStop"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithEStop error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("TokenWithEStop error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithEStop error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("TokenWithEStop error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.TokenWithEStop = Contract;
  }

})();

// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"emergencyStop","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"curator","outputs":[{"name":"","type":"address"}],"type":"function"},{"inputs":[{"name":"_curator","type":"address"}],"type":"constructor"}],
    binary: "606060405260405160208061022683395060806040525160018054600160a060020a03191682179055506101ef806100376000396000f3606060405236156100615760e060020a60003504633ccfd60b811461006357806363a599a4146100b457806370a08231146100f557806375f12b211461010d578063a9059cbb14610121578063d0e30db01461018d578063e66f53b7146101c4575b005b61006160015460009060ff60a060020a90910416156101ec5733600160a060020a03168082526020829052604082208054908390559182606082818181858883f1935050505015156101ec57610002565b61006160015433600160a060020a03908116911614156100f3576001805474ff0000000000000000000000000000000000000000191660a060020a1790555b565b6101d660043560006020819052908152604090205481565b6101e060015460ff60a060020a9091041681565b61006160043560243560015460ff60a060020a9091041615156101895733600160a060020a03166000908152602081905260409020548190106101895760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b61006160015460ff60a060020a9091041615156100f35733600160a060020a03166000908152602081905260409020805434019055565b6101d6600154600160a060020a031681565b6060908152602090f35b15156060908152602090f35b5056",
    unlinked_binary: "606060405260405160208061022683395060806040525160018054600160a060020a03191682179055506101ef806100376000396000f3606060405236156100615760e060020a60003504633ccfd60b811461006357806363a599a4146100b457806370a08231146100f557806375f12b211461010d578063a9059cbb14610121578063d0e30db01461018d578063e66f53b7146101c4575b005b61006160015460009060ff60a060020a90910416156101ec5733600160a060020a03168082526020829052604082208054908390559182606082818181858883f1935050505015156101ec57610002565b61006160015433600160a060020a03908116911614156100f3576001805474ff0000000000000000000000000000000000000000191660a060020a1790555b565b6101d660043560006020819052908152604090205481565b6101e060015460ff60a060020a9091041681565b61006160043560243560015460ff60a060020a9091041615156101895733600160a060020a03166000908152602081905260409020548190106101895760406000818120600160a060020a038581168352928220805485019055339092169052805482900390555b5050565b61006160015460ff60a060020a9091041615156100f35733600160a060020a03166000908152602081905260409020805434019055565b6101d6600154600160a060020a031681565b6060908152602090f35b15156060908152602090f35b5056",
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

// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"callWithdraw","outputs":[],"type":"function"}],
    binary: "6060604052607e8060106000396000f3606060405260e060020a6000350463218fbdec8114601a575b005b60186004357f3ccfd60b00000000000000000000000000000000000000000000000000000000606090815273ffffffffffffffffffffffffffffffffffffffff821690633ccfd60b9060649060009060048183876161da5a03f1156002575050505056",
    unlinked_binary: "6060604052607e8060106000396000f3606060405260e060020a6000350463218fbdec8114601a575b005b60186004357f3ccfd60b00000000000000000000000000000000000000000000000000000000606090815273ffffffffffffffffffffffffffffffffffffffff821690633ccfd60b9060649060009060048183876161da5a03f1156002575050505056",
    address: "0xb459970f4ea896de8f1fd26bf370e3943194ac53",
    generated_with: "2.0.9",
    contract_name: "Recipient"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Recipient error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("Recipient error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Recipient error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Recipient error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Recipient = Contract;
  }

})();

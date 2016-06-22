// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"token","type":"address"}],"name":"callWithdraw","outputs":[],"type":"function"}],
    binary: "606060405260c48060106000396000f360606040523615601d5760e060020a6000350463218fbdec81146074575b60c26000620f42405a111560715760e060020a633ccfd60b026060908152339173ffffffffffffffffffffffffffffffffffffffff831691633ccfd60b9160649160048183876161da5a03f1156002575050505b50565b60c260043560e060020a633ccfd60b02606090815273ffffffffffffffffffffffffffffffffffffffff821690633ccfd60b9060649060009060048183876161da5a03f11560025750505050565b00",
    unlinked_binary: "606060405260c48060106000396000f360606040523615601d5760e060020a6000350463218fbdec81146074575b60c26000620f42405a111560715760e060020a633ccfd60b026060908152339173ffffffffffffffffffffffffffffffffffffffff831691633ccfd60b9160649160048183876161da5a03f1156002575050505b50565b60c260043560e060020a633ccfd60b02606090815273ffffffffffffffffffffffffffffffffffffffff821690633ccfd60b9060649060009060048183876161da5a03f11560025750505050565b00",
    address: "",
    generated_with: "2.0.9",
    contract_name: "EvilRecipient"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("EvilRecipient error: Please call load() first before creating new instance of this contract.");
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
      throw new Error("EvilRecipient error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("EvilRecipient error: Please call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("EvilRecipient error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.EvilRecipient = Contract;
  }

})();

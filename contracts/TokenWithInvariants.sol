contract TokenWithInvariants {
  mapping(address => uint) public balanceOf;
  uint public totalSupply;

  // until https://github.com/ethereum/solidity/issues/686 is fixed, this modifier
  // only fully works for function bodies that do not have a `return`
  modifier checkInvariants { 
    _
    if (this.balance < totalSupply) throw;
  }

  function deposit(uint amount) checkInvariants {
    // intentionally vulnerable
    balanceOf[msg.sender] += amount;
    totalSupply += amount;
  }

  function transfer(address to, uint value) checkInvariants {
    if (balanceOf[msg.sender] >= value) {
      balanceOf[to] += value;
      balanceOf[msg.sender] -= value;
    }
  }

  function withdraw() checkInvariants {
    // intentionally vulnerable
    uint balance = balanceOf[msg.sender];
    if (msg.sender.call.value(balance)()) {
      totalSupply -= balance;
      balanceOf[msg.sender] = 0;
    }
  }
}

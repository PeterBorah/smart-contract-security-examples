contract BrokenToken {
  mapping(address => uint) public balanceOf;

  function deposit(uint amount) {
    // intentionally vulnerable
    balanceOf[msg.sender] += amount;
  }

  function transfer(address to, uint value) {
    if (balanceOf[msg.sender] >= value) {
      balanceOf[to] += value;
      balanceOf[msg.sender] -= value;
    }
  }

  function withdraw() {
    // intentionally vulnerable
    uint balance = balanceOf[msg.sender];
    if (msg.sender.call.value(balance)()) {
      balanceOf[msg.sender] = 0;
    }
  }
}

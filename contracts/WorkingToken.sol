contract WorkingToken {
  mapping(address => uint) public balanceOf;

  function deposit() {
    balanceOf[msg.sender] += msg.value;
  }

  function transfer(address to, uint value) {
    if (balanceOf[msg.sender] >= value) {
      balanceOf[to] += value;
      balanceOf[msg.sender] -= value;
    }
  }

  function withdraw() {
    uint balance = balanceOf[msg.sender];
    balanceOf[msg.sender] = 0;
    if(!msg.sender.send(balance)) throw;
  }
}

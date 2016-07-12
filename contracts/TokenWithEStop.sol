contract TokenWithEStop {
  mapping(address => uint) public balanceOf;
  address public curator;
  bool public stopped;
  uint public totalSupply;

  modifier stopInEmergency { if (!stopped) _ }
  modifier onlyInEmergency { if (stopped) _ }

  function TokenWithEStop(address _curator) {
    curator = _curator;
  }

  function deposit(uint amount) stopInEmergency {
    // intentionally vulnerable
    balanceOf[msg.sender] += amount;
    totalSupply += amount;
  }

  function transfer(address to, uint value) stopInEmergency {
    if (balanceOf[msg.sender] >= value) {
      balanceOf[to] += value;
      balanceOf[msg.sender] -= value;
    }
  }

  function emergencyStop() {
    if (msg.sender == curator) {
      stopped = true;
    }
  }

  function withdraw() onlyInEmergency {
    uint balance = balanceOf[msg.sender];
    balanceOf[msg.sender] = 0;
    totalSupply -= balance;

    if(!msg.sender.send(balance)) throw;
  }
}

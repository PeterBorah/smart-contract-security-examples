contract TokenWithEStop {
  mapping(address => uint) public balanceOf;
  address public curator;
  bool public stopped;

  modifier stopInEmergency { if (!stopped) _ }
  modifier onlyInEmergency { if (stopped) _ }

  function TokenWithEStop(address _curator) {
    curator = _curator;
  }

  function deposit() stopInEmergency {
    balanceOf[msg.sender] += msg.value;
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

  function withdraw() onlyInEmergency{
    uint balance = balanceOf[msg.sender];
    balanceOf[msg.sender] = 0;
    if(!msg.sender.send(balance)) throw;
  }
}

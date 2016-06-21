contract CircuitBreaker {
  struct Transfer { uint amount; address to; uint releaseBlock; bool released; bool stopped; }
  Transfer[] public transfers;

  address public curator;
  address public authorizedSender;
  uint public period;
  uint public limit;

  uint public currentPeriodEnd;
  uint public currentPeriodAmount;

  event PendingTransfer(uint id, uint amount, address to, uint releaseBlock);

  function CircuitBreaker(address _curator, address _authorizedSender, uint _period, uint _limit) {
    curator = _curator;
    period = _period;
    limit = _limit;
    authorizedSender = _authorizedSender;
    currentPeriodEnd = block.number + period;
  }

  function transfer(uint amount, address to) {
    if (msg.sender == authorizedSender) {
      updatePeriod();

      if (currentPeriodAmount + amount > limit) {
        uint releaseBlock = block.number + period;
        PendingTransfer(transfers.length, amount, to, releaseBlock);
        transfers.push(Transfer(amount, to, releaseBlock, false, false));
      } else {
        currentPeriodAmount += amount;
        transfers.push(Transfer(amount, to, block.number, true, false));
        if(!to.send(amount)) throw;
      }
    }
  } 
  
  function updatePeriod() {
    if (currentPeriodEnd < block.number) {
      currentPeriodEnd = block.number + period;
      currentPeriodAmount = 0;
    }
  }

  function releasePendingTransfer(uint id) {
    Transfer transfer = transfers[id];
    if (transfer.releaseBlock <= block.number && !transfer.released && !transfer.stopped) {
      transfer.released = true;
      if(!transfer.to.send(transfer.amount)) throw;
    }
  }
  
  function stopTransfer(uint id) {
    if (msg.sender == curator) {
      transfers[id].stopped = true;
    }
  }
}

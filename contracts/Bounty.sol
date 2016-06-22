import "BrokenToken.sol";

contract Bounty {
  // This bounty will pay out if you can cause BrokenToken's balance
  // to be lower than its totalSupply, which would mean that it doesn't 
  // have sufficient ether for everyone to withdraw.

  uint public totalBounty;
  bool public claimed;
  mapping(address => address) public owners;

  event TargetCreation(address createdAddress);

  function contribute() {
    totalBounty += msg.value;
  }

  function createTarget() returns(BrokenToken) {
    BrokenToken target = new BrokenToken();
    TargetCreation(target);
    owners[address(target)] = msg.sender;
    return target;
  }

  function claimBounty(BrokenToken target) {
    if (owners[target] != 0 && target.totalSupply() > target.balance) {
      totalBounty = 0;
      claimed = true;
      if(!owners[target].send(totalBounty)) throw;
    }
  }
}

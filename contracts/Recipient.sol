import "WorkingToken.sol";

contract Recipient {
  function callWithdraw(WorkingToken token) {
    token.withdraw();
  }
}

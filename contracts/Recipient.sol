pragma solidity ^0.4.8;

import "./WorkingToken.sol";

contract Recipient {
  function callWithdraw(WorkingToken token) {
    token.withdraw();
  }

  function () payable {}
}

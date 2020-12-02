pragma solidity ^ 0.4 .17;

import "../node_modules/zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyToken is StandardToken {
    string public name = "MyRoken";
    string public symbol = "MTK";
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 5000;

    function MyToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(0x0, msg.sender, totalSupply_);
    }
}

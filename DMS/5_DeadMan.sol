pragma solidity >=0.7.0 <0.8.0;

contract Transaction {
    function Add(uint256 a, uint256 b) public pure returns (uint256 c) {
        require(c >= a);
        c = a + b;
    }
}

contract DeadManSwitch is Transaction {
    address payable owner;
    address payable newOwner;

    uint256 _duplicateBalance = 10000000;
    uint256 deployedBlockNumber = 0;
    uint256 currentBlockNumber = 0;

    mapping(address => uint256) balanceCheck;

    constructor() public {
        owner = msg.sender;
        balanceCheck[owner] = _duplicateBalance;
    }

    function inheritToSecondOwner(address payable addr) public {
        require(msg.sender == owner, "Invalid User.");
        newOwner = addr;
    }

    function stayAlive() public returns (uint256) {
        require(msg.sender == owner, "Invalid User.");
        deployedBlockNumber = block.number;
        return block.number;
    }

    function checkIsDead() public payable returns (bool) {
        currentBlockNumber = block.number;
        if ((currentBlockNumber - deployedBlockNumber) > 10) {
            balanceCheck[newOwner] = Add(
                balanceCheck[newOwner],
                balanceCheck[owner]
            );
            balanceCheck[owner] = 0;
            owner = newOwner;
            selfdestruct(newOwner);
            return true;
        } else {
            return false;
        }
    }

    function checkBalance(address inputAddress)
        public
        returns (uint256 balance)
    {
        return balanceCheck[inputAddress];
    }
}

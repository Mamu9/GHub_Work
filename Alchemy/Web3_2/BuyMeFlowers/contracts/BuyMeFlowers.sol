//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract BuyMeFlowers {

    // Event to emit when a Memo is created.
    event NewMemo(
        address indexed from, 
        uint256 timestamp, 
        string name, 
        string message);

    // Memo struct.
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // list of all the memos recieved from friends

        Memo[] memos;

    // Address of contract deployers

    address payable owner;

    // deploy logic
    constructor() {
        owner = payable (msg.sender);
    }

    /**
    * @dev buy a flower or flowers for the contract owner
    * @param _name name of the flower/s buyer
    * @param _message a nice message from the flower/s buyer
    */

    function buyFlower(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Por Favor, no one can buy flower with zero eth");
        
        //Add memo to storage!
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        //emit a log event when a new memo is created
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
    }

    /**
    * @dev send the entire balance to this contract to the owner
    */

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
    * @dev retrieve all the memos recieved and stored in the blockchain 
    */
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }

    
}

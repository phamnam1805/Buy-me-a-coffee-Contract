//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract BuyMeACoffee{

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of all memos received
    Memo[] private memos;
    // Address of contract deployer 
    address payable owner;

    constructor () {
        owner = payable(msg.sender);
    }

    /**
     *@dev Buy a coffee for contract owner
     *@param _name name of the coffee buyer
     *@param _message a message from the coffee buyer
     */
    function buyCoffee(string memory _name, string memory _message) external payable {
        require(msg.value > 0, "Can't buy coffee with 0 ETH");
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
        emit NewMemo(msg.sender, block.timestamp, _name, _message); 
    }
    
    /**
     *@dev Get balance of this contract
     */
    function getContractBalance() public view returns(uint256){
        return address(this).balance;
    }

    /**
     *@dev Get list of all memos received
     */
    function getMemos() public view returns(Memo[] memory){
        return memos;
    } 

    /**
     *@dev Send the entire balance stored in this contract to the owner
     */
    function withdraw() public {
        require(getContractBalance() > 0, "Contract balance is zero");
        require(owner.send(getContractBalance()));
    }
}
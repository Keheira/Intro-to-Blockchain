// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Donations {

  address payable owner;
  
  struct Donation {
    address user;
    string message;
    uint amount;
  }

  Donation[] doners;

  string[] causes; // causes donated to

  modifier isOwner(address _address){
    // Check that person calling is the owner
    require(msg.sender == _address);
    _;
  }

  constructor() public {
    owner = payable(msg.sender);
  }

  function addDonation(uint amount) public {
    //add a user donation to array
  }

  function getPullFunds(uint amount) public payable isOwner(msg.sender){
    // send funds to owner wallet for donation dispersment
  }

  function getAllCauses() public view returns (string[] memory){
    // return all causes money has been used for
    return causes;
  }

  function getAllDomations() public view returns (uint){
    // return total donation amount
    return doners.length;
  }
}

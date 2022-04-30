// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/*
* @title Donation Portal
* @author Keheira
* @notice This contract is a sample donation portal. It acts somewhat like donating bits on a twitch stream.
*/
contract Donations {

  /* 
  * variables
  */

  address public owner;
  
  struct Donation {
    address user;
    string message;
    uint amount;
    uint256 timestamp;
  }

  Donation[] donations;

  // @notice initial top donor is null
  Donation public topDonor;

  // @notice initial total is 0
  uint public donationTotal;

  /*
  * @notice Emitted when there is a new donation
  * @param donor address
  * @param donation amount
  */
  event LogDonationAdded(address donor, uint amount);

  /*
  * @notice Emitted when total donation is calculated
  * @param donation amount
  */
  event LogDonationTotal(uint amount);

  /*
  * @notice Emitted when there is a new top donation
  * @param donation object
  */
  event LogTopDonation(Donation donation);

  /*
  * modifiers
  */
  modifier isOwner {
    // Check that person calling is the owner
    require(msg.sender == owner);
    _;
  }

  constructor() public payable{
    owner = payable(msg.sender);
    donationTotal = 0;
    topDonor = Donation({
      user: address(0),
      message: "contract started",
      amount: 0,
      timestamp: 0
    });
  }

  fallback () external payable { revert(); }

  receive () external payable { revert(); }

  /*
  * @notice Add a new donation to the array
  * @param donation message
  * @param amount of donation
  */
  function addDonation(string memory message, uint amount) public {
    Donation memory newItem = Donation({
      user: msg.sender,
      message: message,
      amount: amount,
      timestamp: block.timestamp
    });
    
    donations.push(newItem);

    if (amount > topDonor.amount){
      topDonor = newItem;
      emit LogTopDonation(topDonor);
    }

    emit LogDonationAdded(msg.sender, amount);
    donationTotal += amount;
    emit LogDonationTotal(donationTotal);
  }

  /*
  * @notice Allow owner to pull donations from the contraact
  */
  function pullDonations(uint amount) public {
    //TODO
  }

  /*
  * @notice Return all donations
  */
  function getAllDonations() public view returns (Donation[] memory){
    return donations;
  }

  /*
  * @notice Return the total amount of donations
  */
  function getTotalDonations() public view returns (uint){
    return donationTotal;
  }

  /*
  * @notice Return top donation
  */
  function getTopDonation() public view returns (Donation memory){
    return topDonor;
  }

  /*
  * @notice get a specific item to testing
  * @param item location
  */
  function getDonation(uint location) public view
  returns (address user, string memory message, uint amount, uint256 timestamp) {
    user = donations[location].user;
    message = donations[location].message;
    amount = uint(donations[location].amount);
    timestamp = donations[location].timestamp;
    return (user, message, amount, timestamp);
  }
}

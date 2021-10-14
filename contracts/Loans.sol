pragma solidity ^0.5.0;

contract Loans {
    // Need a way to set price based on project
    address[5] public loaners;

    // fund project
    function fund(uint projId) public returns (uint){
        require(projId >= 0 && projId <= 4);

        loaners[projId] = msg.sender;

        return projId;
    }

    // return array of loaners
    function getLoaners() public view returns (address[5] memory){
        return loaners;
    }
}
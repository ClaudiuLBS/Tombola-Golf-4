pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Lottery {
  //list of players registered in lotery
  address payable[] public players;
  address payable public admin;
  uint public maxPlayers = 2;
  mapping (address => bool) public wallets;

  constructor() {
    admin = payable(msg.sender);
    //automatically adds admin on deployment
    // players.push(payable(admin));
  }
  
  function setWallet(address _wallet) public{
      wallets[_wallet]=true;
  }

  function contains(address _wallet) public view returns (bool){
    return wallets[_wallet];
  }

  modifier onlyOwner() {
    require(admin == msg.sender, "You are not the owner");
    _;
  }

  function getPlayers() public view returns(address payable[] memory) {
    return players;
  }

  function getPlayersNumber() public view returns(uint) {
    return players.length;
  }

  function getOwner() public view returns(address) {
    return admin;
  }
    
  receive() external payable {
    // require(msg.value == 0.000001 ether , "Must send infinite ether amount");
    
    // require(msg.sender != admin, "You cant participate");
    
    require(wallets[msg.sender] != true, "You joined this lottery");
    

    setWallet(msg.sender);
    // pushing the account conducting the transaction onto the players array as a payable adress
    players.push(payable(msg.sender));

    // if (players.length == maxPlayers) {
    //   pickWinner();
    //   resetLottery();
    // }
  }
    
  function getBalance() public view returns(uint){
      // returns the contract balance 
      return address(this).balance;
  }
    

  function random() internal view returns(uint){
    return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players[players.length-1])));
  }

  function pickWinner() public payable{
    //makes sure that we have enough players in the lottery  
    // require(players.length >= maxPlayers , "Not enough players in the lottery");
    
    address payable winner1;
    address payable winner2;
    //selects the winner with random number
    uint winnerIndex1 = random() % players.length;
    uint winnerIndex2 = winnerIndex1;
    // uint winnerIndex1 = 0;
    // uint winnerIndex2 = 1;
    while (winnerIndex1 == winnerIndex2)
      winnerIndex2 = random() % players.length;
    winner1 = players[winnerIndex1];
    winner2 = players[winnerIndex2];
    //transfers balance to winner
    // winner1.transfer( (getBalance() * 70) / 100); 
    // winner2.transfer( (getBalance() * 25) / 100); 
    // payable(admin).transfer( (getBalance() * 5) / 100);
    (bool success, ) = winner1.call{value: (getBalance() * 70) / 100}("");
        require(success, "Failed to send Ether");
    (bool success1, ) = winner2.call{value: (getBalance() * 25) / 100}("");
          require(success1, "Failed to send Ether");
    (bool success2, ) = admin.call{value: (getBalance() * 5) / 100}("");
          require(success2, "Failed to send Ether");
    //resets the plays array once someone is picked
    resetLottery();
  }
  
  /**
    * @dev resets the lottery
  */ 
  function resetLottery() internal {
    for (uint i=0; i<players.length; i++){
      wallets[players[i]] = false;
    }
    players = new address payable[](0);
  }

}
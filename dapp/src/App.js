import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Lottery from "./artifacts/contracts/Lottery.sol/Lottery.json";

const lotteryAddress = "0xD7C492879dAB85E08Be26830DFA511a5aF900Acc";

function App() {
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        lotteryAddress,
        Lottery.abi,
        provider
      );
      try {
        const data = await contract.getBalance();
        console.log("Balance: ", ethers.utils.formatEther(data));
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  async function getAdmin() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        lotteryAddress,
        Lottery.abi,
        provider
      );
      try {
        const data = await contract.getOwner();
        console.log("Owner: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  async function getPlayersNumber() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        lotteryAddress,
        Lottery.abi,
        provider
      );
      try {
        const data = await contract.getPlayersNumber();
        console.log("Players Number: ", parseInt(data._hex));
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  async function getPlayers() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        lotteryAddress,
        Lottery.abi,
        provider
      );
      try {
        const data = await contract.getPlayers();
        console.log("Players: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  async function pickWinner() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        lotteryAddress,
        Lottery.abi,
        provider.getSigner()
      );
      try {
        const data = await contract.pickWinner();
        console.log("Winner: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function joinLottery() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const contract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
      let senderAddress = "";
      await signer.getAddress().then((result) => (senderAddress = result));
      let gasPrice;
      await provider.getGasPrice().then((result) => (gasPrice = result));
      // console.log(gasPrice);
      const transactionSettings = {
        from: senderAddress,
        to: lotteryAddress,
        value: ethers.utils.parseUnits("0.001", "ether"),
        gasPrice: gasPrice,
        gasLimit: ethers.utils.hexlify(100000),
        nonce: provider.getTransactionCount(senderAddress, "latest"),
      };
      const transaction = await signer.sendTransaction(transactionSettings);
      // console.log(transaction);
      // await contract.pickWinner();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getBalance}>Get Balance</button>
        <br />
        <button onClick={getAdmin}>Get Admin</button>
        <br />
        <button onClick={getPlayersNumber}>Get Players Number</button>
        <br />
        <button onClick={getPlayers}>Get Players</button>
        <br />
        <button onClick={joinLottery}>Enter Lottery</button>
        <br />
        <button onClick={pickWinner}>Pick Winner</button>
      </header>
    </div>
  );
}

export default App;

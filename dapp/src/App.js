import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Lottery from "./artifacts/contracts/Lottery.sol/Lottery.json";

const lotteryAddress = "0x71e9818d82f2a5324FA749a06ED008419FBE0892";

function App() {
  const [lottery, setLotteryValue] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchLottery() {
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
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function receive() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(lotteryAddress, Lottery.abi, signer);
      await contract.pickWinner();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchLottery}>Fetch Greeting</button>
        <br />
        <button onClick={receive}>enter lottery</button>
      </header>
    </div>
  );
}

export default App;

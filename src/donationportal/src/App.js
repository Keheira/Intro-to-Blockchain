import React, {useEffect, useState} from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/Donations.json";

export default function App() {

  //store user public wallet
  const [currentAccount, setCurrentAccount] = useState("")

  const contractAddress = "0xD4C1D3156CCd77123BA8A941560c2B70ccda37f1"

  const contractABI = abi.abi

  const [allDonations, setAllDonations] = useState([])
  const [message, setMessage] = useState("")
  const [total, setTotal] = useState(0)

  const checkIfWalletIsConnected = async () => {
    //make sure we have access to window.Ethereum
    try {
      const {ethereum} = window;

      if(!ethereum){
        alert("You need metamask")
        return
      } else {
        console.log("ethereum object: ", ethereum)
      }

      // authorized access to wallet?
      const accounts = await ethereum.request({method:'eth_accounts'})

      if(accounts.length !== 0) {
        const account = accounts[0]
        setCurrentAccount(account)
        await getAllJokes()
      } else {
        console.log("No authorized account")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const connectWallet = async () => {
    try{
      const {ethereum} = window

      if(!ethereum){
        alert('You need Metamask')
        return
      }
      const accounts = await ethereum.request({method:"eth_requestAccounts"})

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  const sendDonation = async () => {
    try {
      const {ethereum} = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const donationContract = new ethers.Contract(contractAddress, contractABI, signer)

        let count = await donationContract.getTotalDonations()
        console.log("Total joke count: ", count.toNumber())

        const jokeTxn = await donationContract.addDonation(message,{gasLimit: 300000})
        console.log("Mining...")

        await jokeTxn.wait()
        console.log("Mined!")

        count = await jokePortalContract.getTotalDonations()
        console.log("Total joke count: ", count.toNumber()) 
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllDonations = async () => {
    try {
      const {ethereum} = window

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const donationContract = new ethers.Contract(contractAddress, contractABI, signer)

        const donations = await donationContract.getTotalDonations()

        let donationList = []
        donations.forEach(donation => {
          donationList.push({
            address: donation.user,
            timestamp: new Date(donation.timestamp*1000),
            message: donation.message,
            amount: donation.amount
          })
        })

        setAllDonations(donationList)

        donationContract.on("NewDonation", (from, timestamp, message, amount) => {
          console.log("NewDonation", from, timestamp, message, amount)

          setAllDonations(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp*1000),
            message: message,
            amount: amount
          }])
        })
      } else {
        console.log("object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // run function when page loads
  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const renderNotConnectedContainer  = () => {
    if(donationList == null){
      return(
        <div className="connected-container">
          <p>No donations yet :(</p>
        </div>
      )
    } else {
      return (
        <div className="connected-container">
          <input 
            type="text" 
            placeholder="Enter a good gif link"
            value={message}
            onChange={onInputChange} />
            <div className="btn-grid">
              <button className="waveButton" onClick={donation}>
                0.25 ETH
              </button>
              <button className="waveButton" onClick={donation}>
                0.5 ETH
              </button>
              <button className="waveButton" onClick={donation}>
                1 ETH
              </button>
              <button className="waveButton" onClick={donation}>
                2 ETH
              </button>
            </div>
        </div>
      )
    }
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        Donation Portal
        </div>

        <div className="bio">
        This is a donation portal. Feel free to leave a message with your donation.
        (using the Ropsten network)
        </div>
        Total Donations: {total}

        {currentAccount && (
          <div className="input">
          <input
          type="text"
          placeholder="want to leave a message (please keep it clean)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={140} />
          </div>
        )}
        
        <button className="waveButton" onClick={donation}>
          No value
        </button>

        {renderNotConnectedContainer()}

        {/* if no currentAccount show btn*/}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button>
        )}

        {allJokes.map((joke, index) => {
          return (
            <div key={index} style={{backgroundColor:"turquoise", marginTop:"16px", padding:"8px"}}>
            <div>Time: {joke.timestamp.toString()}</div>
            <div>Message: {joke.message}</div>
          </div>)
        })}
      </div>
    </div>
  )
}

// import { degendapp } from 'degenDapp'; //See future docs at docs.DegenDapp.com | DegenerateDapp.com | DegenerateW3b3! (2/24/23)
// import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import { ethers } from 'ethers';
import {useState, useEffect} from 'react'; //Added useEffect pt 2 (1:26): https://youtu.be/A0B13zKVhPE?t=86
import {GiBoltSpellCast} from 'react-icons/gi' //Added react icons pt 2 (15:10): https://youtu.be/A0B13zKVhPE?t=910
import abi from './abi/abi.json'; // added 4th min part 3. 
import data from './data/data.json';
// import {dappgator} from 'dappgator';


function App() {

  //const [account, setAccount] = useState(null); //pt 1 (16:16)
  const [account, setAccount] = useState(""); //pt 2 (13:00) updated for ternary operator check
  const [provider, setProvider] = useState(null); // Added pt 3 (5:45): https://youtu.be/uc8YunBk3XI?t=345
  const [nfts, setNfts] = useState(data); 

  const balance = async () => {
    const contract = new ethers.Contract("0xa27D1cEDF3AeCB7c88358caAaF4A27301e1F1a43", abi, provider);
    // const contract = ethers.Contract("0xa27D1cEDF3AeCB7c88358caAaF4A27301e1F1a43", abi, provider); 
    
    // const tempBalance = contract.balanceOf(account); 
    const tempBalance = await contract.balanceOf("0xfa1B88F6a4Efa3Fc139492DC1B9cc5A3d66fDDC9"); 
    // const tempBalance = await contract.balanceOf("0x2354dd2986605c47331714ad31d8789755ce4f42");
    
    console.log(tempBalance.toString()); 
  }

  //Added pt 4 (6:49): check the balance of each: https://youtu.be/KLzuYsHPuBA?t=409
  const checkTheCollection = () => {
    data.list.foreach((nft) => {
      console.log(nft);
    });
  }

  //Added using ethers (pt1 11:30): https://youtu.be/QkmXFCBSHgs?t=681
  const initConnection = async() => {
    if(typeof window.ethereum !== "undefined"){
       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); 
      // const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      // const tempProvider = new ethers.getDefaultProvider(window.ethereum); 

//USE WebSocketProvider INSTEAD OF Web3Provider - idea from (57 - 59th minute): https://youtu.be/t8U7GRrlYW8?t=3550
      // const tempProvider = new ethers.WebSocketProvider.Web3Provider(window.ethereum); //from Moralis Wagmi
      // const tempProvider = ethers.WebSocketProvider.Web3Provider(window.ethereum);
      const tempProvider = new ethers.WebSocketProvider(window.ethereum);

      setProvider(tempProvider); 
          // console.log(accounts[0]);
          // setAccount = accounts[0]; 
      setAccount(accounts[0]); 
    }else{
        alert("Please install MetaMask"); 
    }
  }

  let displayButton; 
  // if(account == null){ - removed style on button style={{ display:`${displayButton}` }}
  if(account == ""){
    displayButton = "block";
  }else{
    displayButton = "none";
  }

//Added useEffect() anonymous fn (pt2 1:44)
//end with empty brackets b/c there are no dependencies
  useEffect(() => {
    initConnection(); 
    console.log(nfts.list);
  }, []); //end with empty brackets b/c no dependenices (pt2 1:56)

//Added 2nd useEffect Part 4 (7:06): https://youtu.be/KLzuYsHPuBA?t=426
// We want this 2nd useEffect to run EVERY time the account changes.
// In this 2nd useEffect the account is called as a dependency? 
  // useEffect(() => {}); 
  // useEffect(() => {
  //   checkTheCollection();
  // }, [account]); 

  return (
    <div className="page">
      <div className="header">
        <img src={require('./assets/images/sketchy_labs_logo.png')}
          className="articon"
        />
          <p>11/11 
            <span>
              <GiBoltSpellCast style={{ marginLeft: "5px" }}/>
            </span>         
          </p>
                 
        {account == "" ? 
          (<button onClick={initConnection} className="button">Connect</button>)
         :
          (<p>...{account.substring(account.length - 7)} </p>)
        }
          
      </div>

      {/* <button onClick={balance} classname="button">Get Balance</button> */}
      <div className="main">
          {nfts.list.map((nft, index) => {
              return (
                <div key={index} className="card">
                    <div style={{ position: "relative"}}>
                          <a target={"_blank"} href={`https://opensea.io/collection/${nft.link}`}>

                              <img src={require("./assets/images/opensea.png")}              
                                className="cardImage"
                              />

                          </a>
       
                          <GiBoltSpellCast className="cardImage" style={{ opacity: nft.owner ? 1 : 0.2 }}/>
                          <p className="counter">{nft.count}</p>
                    </div>
                      <img src={require(`./assets/images/${nft.id}.${nft.type}`)}
                        className="nftImage"
                        style={{ opacity: nft.owner ? 1 : 0.2 }}
                      />
                      <p className="nftText">{nft.name}</p>
                      
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default App;

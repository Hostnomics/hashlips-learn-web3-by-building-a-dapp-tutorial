// import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import {ethers} from 'ethers';
import {useState, useEffect} from 'react'; //Added useEffect pt 2 (1:26): https://youtu.be/A0B13zKVhPE?t=86

function App() {

  const [account, setAccount] = useState(null); //pt 1 (16:16)

  //Added using ethers (pt1 11:30): https://youtu.be/QkmXFCBSHgs?t=681
  const initConnection = async() => {
    if(typeof window.ethereum !== "undefined"){
       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); 
      console.log(accounts[0]);
      // setAccount = accounts[0]; 
      setAccount(accounts[0]); 
    }else{
        alert("Please install MetaMask"); 
    }
  }

  let displayButton; 
  if(account == null){
    displayButton = "block";
  }else{
    displayButton = "none";
  }

  useEffect(() => {
    initConnection(); 
  }, []); //end with empty brackets b/c no dependenices (pt2 1:56)


  return (
    <div className="page">
      <div className="header">
        <img src={require('./assets/images/sketchy_labs_logo.png')}
          className="articon"
        />
          <p>11/11</p>
          {/* <p>{displayButton}</p> */}
     
        <button onClick={initConnection} classname="button" style={{ display:`${displayButton}` }}>Connect</button>
        {account == "" ? (<p></p>) : (<p>{account}</p>)}
          
      </div>
    </div>
  );
}

export default App;

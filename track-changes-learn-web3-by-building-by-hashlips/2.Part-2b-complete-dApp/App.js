// import logo from './logo.svg'; <img src={logo} className="App-logo" alt="logo" />
import './App.css';
import {ethers} from 'ethers';
import {useState, useEffect} from 'react'; //Added useEffect pt 2 (1:26): https://youtu.be/A0B13zKVhPE?t=86
import {GiBoltSpellCast} from 'react-icons/gi' //Added react icons pt 2 (15:10): https://youtu.be/A0B13zKVhPE?t=910

function App() {

  //const [account, setAccount] = useState(null); //pt 1 (16:16)
  const [account, setAccount] = useState(""); //pt 2 (13:00) updated for ternary operator check

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
  // if(account == null){ - removed style on button style={{ display:`${displayButton}` }}
  if(account == ""){
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
          <p>11/11 
            <span>
              <GiBoltSpellCast style={{ marginLeft: "5px" }}/>
            </span>         
          </p>
                 
        {account == "" ? 
          (<button onClick={initConnection} classname="button">Connect</button>)
         :
          (<p>...{account.substring(account.length - 7)} </p>)
        }
          
      </div>
    </div>
  );
}

export default App;

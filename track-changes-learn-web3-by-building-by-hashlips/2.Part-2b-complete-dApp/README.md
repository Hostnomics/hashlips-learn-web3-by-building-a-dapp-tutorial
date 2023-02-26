## Building Dapp Notes
[Part 1 YouTube Video From Hashlips](https://youtu.be/QkmXFCBSHgs).

Create app with `npx create-react-app collection`
1. [6th minute](https://youtu.be/QkmXFCBSHgs?t=360) Add homepage: "." to package.json
    - Run local server with `npm start` or `npm run start`
2. update CSS
3. Clean up App.js
4. Install ethers.js `npm install ethers`
    - 4a. Create function `initConnection` [pt 1 (11:30)](https://youtu.be/QkmXFCBSHgs?t=690).
    - if Metamask wallet installed there will be a `window.ethereum` object we can check for with:    
        - 

**initConnection**
```js
  const initConnection = async() => {
    if(typeof window.ethereum !== "undefined"){
        console.log("Please sign into MetaMask");
    }else{
        alert("Please install MetaMask"); 
    }
  }

```

**In App.js:**
```js
import './App.css';
import {ethers} from 'ethers';

const initConnection = async() => {
    if(typeof window.ethereum !== "undefined"){
      // console.log("Please sign into MetaMask");
      // Using ethers get address from MetaMask (11:21): https://youtu.be/QkmXFCBSHgs?t=681
       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); 
      console.log(accounts[0]);
    }else{
        alert("Please install MetaMask"); 
    }
  }


```


5. Create STATE to hold the address [16:16](https://youtu.be/QkmXFCBSHgs?t=976).

Key Steps: 
```js
const [account, setAccount] = useState(null); //pt 1 (16:16)

 // setAccount = accounts[0]; 
      setAccount(accounts[0]); 

      <p>{account}</p>
```

Full Implementation: 
```js
//5a. Create state `account` and setAccount, with initial state as NULL
const [account, setAccount] = useState(null); //pt 1 (16:16)

//5b. IF browser has an ethereum object setAccount to wallet address: 
if(typeof window.ethereum !== "undefined"){
       const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      }); 
      console.log(accounts[0]);
      // setAccount = accounts[0]; 
      setAccount(accounts[0]); 
    }

//5c. Call the address for now in our App.js return statement: 
  return (
    <div className="App">
      <button onClick={initConnection}>Connect</button>
      <hr></hr>
      <p>{account}</p>

    </div>
  );

```


## Part 2: Set up provider so we can interact with the Contract: 
[Part 2 YouTube Video From Hashlips](https://www.youtube.com/watch?v=A0B13zKVhPE).

6. Add `useEffect` **hook** to save the **STATE** of the user's wallet address BETWEEN _Refreshes_

```js
  useEffect(() => {
    initConnection(); 
  },[]); //end with empty brackets b/c no dependenices (pt2 1:56)

```

### Ternary Operator

```js
//JSX Expressions must have one parent violated with hr tag
  return (
    <div className="page">
      <div className="header">
        <img src={require('./assets/images/sketchy_labs_logo.png')}
          className="articon"
        />
          <p>11/11</p>
          

      {account == "" ? 
          <button onClick={initConnection} classname="button">Connect</button>
          : 
          {/* <hr></hr> JSX expressions must have one parent */}
          <p>{account}</p>
          }
      </div>
    </div>
  );
}
```

Recommended Formatting: 
```js


```


### Substring to Trim the Wallet Account shown: 
At [13:34](https://youtu.be/A0B13zKVhPE?t=814).

```js

//So this (full account)
<p>{account}</p>

// Becomes: ...66fddc9
<p>...{account.substring(account.length - 7)}

```


### Install React Icons
[Follow the React Docs](https://react-icons.github.io/react-icons/). to install **React Icons** to our project
[14:03 part 2](https://youtu.be/A0B13zKVhPE?t=843).


## Part 3: 
[Part 3 YouTube Video From Hashlips](https://www.youtube.com/watch?v=uc8YunBk3XI).




## Part 4: 
[Part 4 YouTube Video From HashLips](https://youtu.be/QkmXFCBSHgs).



## See Other React Series on NFT DROPS
[Part 2 of this other series was 1:44:00 long](https://www.youtube.com/watch?v=-j1JEBWg8Tw&t=5s).
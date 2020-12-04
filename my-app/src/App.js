import React, {
  Component
} from 'react';
import Web3 from 'web3';


class App extends Component {
  
  constructor(props) {
    super(props)
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
    console.log(this.web3)
    this.state = {
      myAccountAddress: "My Contact Address"
    }
  }
  

  componentWillMount(){
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
    this.web3.eth.getAccounts().then(accounts =>{
      console.log(accounts)
      if(accounts[0]){
        this.setState({myAccountAddress:accounts[0]})
      }
      else{
        this.setState({ myAccountAddress: "undefined. Log in to Metamsk please!"})
      }
    })
  }

  render() {
    return (
      <div >
      Hello World 
    <div>Your address is {this.state.myAccountAddress}</div>
      </div>
  )
}
}
export default App;

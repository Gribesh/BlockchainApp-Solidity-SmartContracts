import React, {
  Component
} from 'react';
import Web3 from 'web3';

class App extends Component {

  constructor(props) {
    super(props)
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
    this.state = {
      myAccountAddress: "My Contact Address"
    }
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
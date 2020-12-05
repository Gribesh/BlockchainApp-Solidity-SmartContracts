import React, {
  Component
} from 'react';
import Web3 from 'web3';


class App extends Component {
  
  constructor(props) {
    super(props)
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
    // const contractJSON 
    this.contract = new this.web3.eth.Contract(
      [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}],
      "0x56BEA65369a0f81A8Fd321cE55329DC3D38512b1"

    )
    console.log(this.web3)
    this.state = {
      myAccountAddress: "My Contact Address",
      myAccountBalance: 0,
      tokenSymbol: "???",
      decimals:0,
      numberOfTokenSend:0,
      addressTo:'',
      msg:''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }
  

  componentWillMount(){
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8546")
    this.web3.eth.getAccounts().then(accounts =>{
      console.log(accounts)
      if(accounts[0]){
        this.setState({myAccountAddress:accounts[0]})
        console.log(this.contract);
        // var result = this.contract.methods.symbol().call().then(tokenSymbol=>{ return tokenSymbol});
        // console.log(result);
        this.contract.methods.balanceOf(accounts[0]).call().then(balance =>{
          this.contract.methods.decimals().call().then(decimals=>{
            this.contract.methods.symbol().call().then(tokenSymbols=>{
              console.log(tokenSymbols)
              console.log(decimals)
              console.log(balance/Math.pow(10,decimals))
              this.setState({
                decimals:decimals,
                myAccountBalance:balance/Math.pow(10,decimals),
                tokenSymbol:tokenSymbols
              })
            })
          })
        })
        
        
      }
      else{
        this.setState({ myAccountAddress: "undefined. Log in to Metamsk please!"})
      }
    })
  }

  handleInputChange(event){
    const target = event.target
    const value = target.value
    const name = target.name
    console.log("Input"+ name+ " value has been changed to " + value);
    this.setState({
      [name]:value
    }) 
  }

  handleSubmit(event){
    event.preventDefault();
    console.log("Button Clickced.")
    const addressTo = this.state.addressTo
    const decimals = this.state.decimals
    const numberOfTokenSend = this.state.numberOfTokenSend * Math.pow(10,decimals)
    const myAccount=this.state.myAccountAddress
    console.log("Numbers of TOken to send " + numberOfTokenSend)
    console.log("Address to: "+ addressTo)
    console.log("")

    this.contract.methods.transfer(addressTo,numberOfTokenSend).send({from: myAccount}).on('transactionHash',function(hash){
      this.setState({msg: "You will be able to find your txn here"+ hash})
    }.bind(this)).on('error',function(error){
      this.setState({msg: "Error Occured "+ error})
    }.bind(this))

  }
  render() {
    return (
      <div >
      Hello World 
    <div>Your address is {this.state.myAccountAddress}</div>
    <div>Your have  {this.state.myAccountBalance} {this.state.tokenSymbol} tokens</div>
    <form onSubmit= {this.handleSubmit}>
      <label>
        Send <input type="number" name="numberOfTokenSend"value={this.state.numberOfTokenSend} onChange={this.handleInputChange}/> tokens
      </label>
      <br/>
      <br/>
      <label>
        To <input type="text" name="addressTo" value={this.state.addressTo} onChange={this.handleInputChange} /> address
      </label>
      <input type="submit" value="Submit"/>
    </form>
    <div>Message: {this.state.msg}</div>
      </div>
  )
}
}
export default App;
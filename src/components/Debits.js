import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountBalance from './AccountBalance';



class Debits extends Component {
    constructor(props) {
      super(props);
      this.state = {
        debits: []
      }
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value });
      }
    
    handleAmount = (e) => {
        this.setState({ amount: e.target.value });
      }

    componentDidMount() {
    axios.get('https://moj-api.herokuapp.com/debits').then(res => {
        console.log(res);
        this.setState({ debits: res.data });
    })
    }

    addDebit = (e) => {
        e.preventDefault();
        const newDebit = this.state.debits;
        const date = new Date().toLocaleDateString("en-US");
        this.setState({date});
        
        let newDebitInfo = {
            description: this.state.description,
            amount: this.state.amount,
            date
          }
        
        newDebit.unshift({description: this.state.description, amount: this.state.amount, date});
        this.props.sum(this.state.amount, "debits");
        this.props.addDebit(newDebitInfo);
        this.setState({credits: newDebit});
    }
    
    
  render() {
    return (
      <div>
        <h1>Debits</h1>
        <table className="data">
          {this.state.debits.map(
            debits =>
              <tr key={debits.id}>
                <td> Amount: {debits.amount}</td>
                <td> Description: {debits.description}</td>
                <td> Date: {debits.date}</td>
              </tr>
          )}
        </table>
        <br/>
        <form>
          <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description"/>
          <input type="number" value={this.state.amount} onChange={this.handleAmount} placeholder="Enter Amount"/>
          <button className="add" onClick={this.addDebit}>Add Debit</button>
        </form>

        <AccountBalance accountBalance={this.props.accountBalance} />
        <Link to="/login">Login</Link>
        <Link to="/">Return to home</Link>
        <Link to="/userprofile">User Profile</Link>
        <Link to="/credits">Credits</Link>
      </div>
    );
  }
}

export default Debits;



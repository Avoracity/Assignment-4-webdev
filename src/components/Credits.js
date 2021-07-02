import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AccountBalance from './AccountBalance';


class Credits extends Component {
    constructor(props) {
      super(props);
      this.state = {
        credits: []
      }
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value });
      }
    
      handleAmount = (e) => {
        this.setState({ amount: e.target.value });
      }
    
      // Will be used to fetch api
      componentDidMount() {
        axios.get('https://moj-api.herokuapp.com/credits').then(res => {
          console.log(res);
          this.setState({ credits: res.data });
        })
      }
    
      addCredit = (e) => {
        e.preventDefault();
        const newCredit = this.state.credits;
        const date = new Date().toLocaleDateString("en-US");
        this.setState({date});
    
        let newCreditInfo = {
          description: this.state.description,
          amount: this.state.amount,
          date
        }
    
        newCredit.unshift({description: this.state.description, amount: this.state.amount, date});
        this.props.sum(this.state.amount, "credits");
        this.props.addCredit(newCreditInfo);
        this.setState({credits: newCredit});
      }
    
      render() {
        return (
          <div>
            <h1>Credits</h1>
            <table className="data">
              {this.state.credits.map(
                credits =>
                  <tr key={credits.id}>
                    <td> Amount: {credits.amount}</td>
                    <td> Description: {credits.description}</td>
                    <td> Date: {credits.date}</td>
                  </tr>
              )}
            </table>
            <br/>
            <form>
              <input type="text" value={this.state.description} onChange={this.handleDescription} placeholder="Enter Description"/>
              <input type="number" value={this.state.amount} onChange={this.handleAmount} placeholder="Enter Amount"/>
              <button className="add" onClick={this.addCredit}>Add Credit</button>
            </form>
    
            <AccountBalance accountBalance={this.props.accountBalance} />
            <Link to="/login">Login </Link>
            <Link to="/">Home </Link>
            <Link to="/userprofile">User Profile </Link>
            <Link to="/debits">Debits </Link>
          </div>
        );
      }
    }
    
    export default Credits;
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
    }
    
    


}
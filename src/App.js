// src/components/App.js

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/LogIn';
import Debits from './components/Debits';
import Credits from './components/Credits';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accountBalance: 0,
      debitTotal: 0,
      creditTotal: 0,
      currentUser: {
        userName: 'joe_shmo',
        memberSince: '07/23/96',
      },
      debits: [],
      credits: [],
    }
  }

  async componentDidMount() {
    let credits = await axios.get("https://moj-api.herokuapp.com/credits");
    credits = credits.data;
    credits.forEach((credit) => {
      this.sum(credit.amount, "credits");
    });
    let debits = await axios.get("https://moj-api.herokuapp.com/debits");
    debits = debits.data;
    debits.forEach((debit) => {
      this.sum(debit.amount, "debits");
    });
    this.setState({ debits, credits, accountBalance: this.state.debitTotal - this.state.creditTotal });
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  sum = (sum, creditOrDebit) => {
    if (creditOrDebit === "credits") {
      this.setState({ creditSum: this.state.creditSum + parseInt(sum) }, () => this.setState({ accountBalance: this.state.creditSum - this.state.debitSum }));
    }
    if (creditOrDebit === "debits") {
      this.setState({ debitSum: this.state.debitSum + parseInt(sum) }, () => this.setState({ accountBalance: this.state.creditSum - this.state.debitSum }))
    }
  }

  updateCredit = (newCred) => {
    let newCredit = this.state.credits
    newCredit.push(newCred)
    this.setState({ credits: newCredit })
  }

  updateDebit = (newDeb) => {
    let newDebit = this.state.debits
    newDebit.push(newDeb)
    this.setState({ debits: newDebit })
  }
  

  render() {

    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
  

    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
        accountBalance={this.state.accountBalance}
      />
    );

    const DebitsComponent = () => (
      <Debits
        addDebit={this.updateDebit}
        debits={this.state.debits}
        sum={this.sum}
        creditTotal={this.state.creditTotal}
        debitTotal={this.state.debitTotal}
        accountBalance={this.state.accountBalance}
      />
    );

    const CreditsComponent = () => (
      <Credits
        addCredit={this.updateCredit}
        credits={this.state.credits}
        sum={this.sum}
        creditTotal={this.state.creditTotal}
        debitTotal={this.state.debitTotal}
        accountBalance={this.state.accountBalance}
      />);

    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)


    return (
        <Router>
          <div>
            <Route exact path="/" render={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/debits" render={DebitsComponent} />
            <Route exact path="/credits" render={CreditsComponent} />
          </div>
        </Router>
    );
  }

}

export default App;
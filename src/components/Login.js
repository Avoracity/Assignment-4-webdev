// src/components/Login.js
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import AccountBalance from './AccountBalance';

class LogIn extends Component {
  constructor () {
    super()
    this.state = {
      user: {
        userName: '',
        password: ''
      },
      redirect: false
    }
  }

  handleChange = (e) => {
    const updatedUser = {...this.state.user}
    const inputField = e.target.name
    const inputValue = e.target.value
    updatedUser[inputField] = inputValue

    this.setState({user: updatedUser})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.mockLogIn(this.state.user)
    this.setState({redirect: true})
  }

  render () {
    if (this.state.redirect) {
      return (<Redirect to="/userProfile"/>)
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input type="text" name="userName" onChange={this.handleChange} value={this.state.user.userName} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>
          <button>Log In</button>
        </form>

        <Link to="/userProfile">User Profile</Link>
        <Link to="/Debits">Debits</Link>
        <Link to="/Credits">Credits</Link>
        <Link to="/">Return to Home</Link>

        <AccountBalance accountBalance={this.props.accountBalance}/>

      </div>
    )
  }
}

export default LogIn
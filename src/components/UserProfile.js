// src/components/UserProfile.js

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
  render() {
    return (
        <div>
          <h1>User Profile</h1>

          <div>Username: {this.props.userName}</div>
          <div>Member Since: {this.props.memberSince}</div>
          
          <Link to="/">Return to Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/credits">Credits</Link>
          <Link to="/debits">Debits</Link>
        
          <AccountBalance accountBalance={this.props.accountBalance} />

        </div>
    );
  }
}

export default UserProfile;
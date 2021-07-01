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
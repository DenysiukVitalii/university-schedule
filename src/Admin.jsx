import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Admin Page</h1>
          <Link to="/" className="btn">Home</Link>
        </header>
      </div>
    );
  }
}

export default Admin;
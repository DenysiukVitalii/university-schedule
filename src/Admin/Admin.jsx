import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Specializations from '../Specializations/Specializations';

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
        <main> 
          <ul>
            <li><Link to="/specs" className="btn">Specializations</Link></li>
          </ul>
        </main>
        <Switch>
          <Route path="/specs" component={Specializations}/>
        </Switch>
      </div>
    );
  }
}

export default Admin;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputAutocomplete } from 'input-autocomplete'
//import logo from './logo.svg';
import './App.css';
import myfetch from '../myfetch';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
   this.getGroups();
  }

  getGroups() {
    myfetch('')
    .then( data => { 
      let groups = data.map(e => e.id);
      this.setState({ groups: groups });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
       <div className="container">
         <Header/>
         <div className="choose_group">
          <span>Choose group: </span>
          <InputAutocomplete
            type='text'
            name="group"
            className="form-control"
            autocompleteValues={this.state.groups}
            placeholder="Group"
           />
          <button className="btn">Get schedule</button>
         </div>
       </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header>
        <h1 className="text-left">University Schedule</h1>
        <Link to="/admin" className="btn">Admin</Link>
      </header>
    );
  }
}

export default App;

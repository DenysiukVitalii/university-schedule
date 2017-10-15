import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log("here");
    fetch('http://localhost:8080/')
    .then(response => {
      return response.json();
    }).then( data => { 
      console.log(data);
      let teachers = data.map(e => {
        return (
          <li key={e.id}>
            {e.surname} {e.name} {e.lastname} ({e.position}, {e.phone})
          </li>
        )
      })
      this.setState({
        teachers: teachers
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.state.teachers}
        </ul>
      </div>
    );
  }
}

export default App;

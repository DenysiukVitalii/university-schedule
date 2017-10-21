import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateSpec extends Component {
  constructor() {
    super();
    this.state = {spec_name: ""};

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    var val = e.target.value;
    this.setState({spec_name: val});
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.spec_name);
    fetch('http://localhost:8080/create_spec').then(response => {
      return response.json();
    }).then( data => { 
      console.log(data);
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render() {
    return (
      <div className="container" id="createSpec">
        <header>
          <h1>CreateSpec Page</h1>
          <Link to="/specs" className="btn">Back</Link>
        </header>
        <main>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="spec_name">Specialization name</label>
            <input type="text" name="spec_name" className="form-control" placeholder="Specialization name"
                   value={this.state.spec_name} onChange={this.onChange}/>
          </div>
          <button type="submit" className="btn">Create</button>
        </form>
        </main>
      </div>
    );
  }
}


export default CreateSpec;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class CreateSpec extends Component {
  constructor() {
    super();
    this.state = {spec_name: "", alert: null};

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
  }

  onChange(e) {
    var val = e.target.value;
    this.setState({spec_name: val});
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.spec_name);
    let obj = { spec_name: this.state.spec_name };
    fetch('http://localhost:8080/create_spec', {  
      method: 'post',  
      headers: {  
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(obj)  
    }).then(response => {
      return response.json();
    }).then( data => { 
      data.success = JSON.parse(data.success);
      if (data.success) {
        const getSuccess = () => (
          <SweetAlert 
            success 
            title="Success" 
            onConfirm={() => this.hideAlert()}
          >
            Specialty added successfully!
          </SweetAlert>
        );

        this.setState({
          alert: getSuccess(),
          spec_name: ''
        });
      } else {
        const getError = () => (
          <SweetAlert 
            error 
            title="Error" 
            onConfirm={() => this.hideAlert()}
          >
            Such specialty already exists!
          </SweetAlert>
        );
  
        this.setState({
          alert: getError(),
          spec_name: ''
        });
      }
      
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
        <form onSubmit={this.handleSubmit} id="create-spec-form">
          <div className="form-group">
            <label htmlFor="spec_name">Specialization name</label>
            <input type="text" name="spec_name" className="form-control" placeholder="Specialization name"
                   value={this.state.spec_name} onChange={this.onChange}/>
          </div>
          <button type="submit" className="btn">Create</button>
        </form>
        </main>
        {this.state.alert}
      </div>
    );
  }
}


export default CreateSpec;
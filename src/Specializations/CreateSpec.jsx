import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';

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
    let obj = { spec_name: this.state.spec_name };
    myfetch('create_spec', 'post', obj)
    .then( data => { 
      data.success = JSON.parse(data.success);
      if (data.success) {
        this.setState({
          alert: this.getAlert(true, 'Specialty added successfully!'),
          spec_name: ''
        });
      } else {  
        this.setState({
          alert: this.getAlert(false, 'Such specialty already exists!'),
          spec_name: ''
        });
      }
    })
  }

  getAlert(state, message) {
    return (state) ? (
        <SweetAlert success title="Success" onConfirm={this.hideAlert}>
          {message}
        </SweetAlert>
      ) : (
        <SweetAlert error title="Error" onConfirm={this.hideAlert}>
          {message}
        </SweetAlert>
      );
  }

  render() {
    return (
      <div className="container" id="createSpec">
        <Header />
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

const Header = () => (
  <header>
    <h1>CreateSpec Page</h1>
    <Link to="/specs" className="btn">Back</Link>
  </header>
);


export default CreateSpec;
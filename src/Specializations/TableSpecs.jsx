import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {specs: [], alert: null};
    this.hideAlert = this.hideAlert.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
    this.getSpecialties = this.getSpecialties.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
   }
 
   getSpecialties() {
     fetch('http://localhost:8080/all_specs').then(response => {
       return response.json();
     }).then( data => { 
       console.log(data);
       let specs = data.map(e => (
         <tr key={e.id} align="center">
           <td>{e.id}</td>
           <td>{e.spec_name}</td>
           <td width="25%">
              <button className="btn btn-warning">Edit</button>
              <button className="btn btn-danger" onClick={() => this.deleteSpecialty(e)}>Delete</button>
           </td>
         </tr>
       ));
       this.setState({ specs: specs });
     })
     .catch(error => {
       console.log('Error fetching and parsing data', error);
     });
   }

   deleteSpecialty(item) {
    console.log(item);
    fetch('http://localhost:8080/delete_spec', {  
      method: 'delete',  
      headers: {  
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },  
      body: JSON.stringify(item)  
    }).then(response => {
      return response.json();
    }).then( data => { 
      data.success = JSON.parse(data.success);
      console.log(data);
      if (data.success) {
        let specs = this.state.specs;
        let ids = specs.map(i => +i.key);
        let index = ids.indexOf(item.id);
        specs.splice(index, 1);
        this.setState({specs: specs });
      } else {
        const getError = () => (
          <SweetAlert 
            error 
            title="Error" 
            onConfirm={() => this.hideAlert()}
          >
            You can't delete this specialty!
          </SweetAlert>
        );
  
        this.setState({
          alert: getError()
        });
      }
    });
   }

   hideAlert() {
      console.log('Hiding alert...');
      this.setState({
        alert: null
      });
   }


  render() {
    return (
      <div className="container">
        <Header />
          <main>
              <table className="table table-hover">
                  <thead align="center" className="blue-background bold">
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>{this.state.specs}</tbody>
              </table>
              {this.state.alert}
          </main>
      </div>
    );
  }
}

const Header = () => (
  <header>
    <h1>TableSpecs</h1>
    <div className="actions">
      <Link to="/newspec" className="btn">Create Spec</Link>
      <Link to="/admin" className="btn">Back</Link>
    </div>
  </header>
);



export default TableSpecs;
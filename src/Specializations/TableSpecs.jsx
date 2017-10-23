import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {specs: [], alert: null, showModal: false, currentItem: ''};
    this.hideAlert = this.hideAlert.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
    this.getSpecialties = this.getSpecialties.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
   }
 
   getSpecialties() {
     console.log('here  ');
     fetch('http://localhost:8080/all_specs').then(response => {
       return response.json();
     }).then( data => { 
       console.log(data);
       let specs = data;
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
        let ids = specs.map(i => +i.id);
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

  close() {
    this.setState({ showModal: false,  currentItem: '' });
  }

  async open(e) {
    await this.setState({ showModal: true, currentItem: e});
    console.log(this.state.currentItem);
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
                  <tbody>
                    {this.state.specs.map(e => (
                        <tr key={e.id} align="center">
                          <td>{e.id}</td>
                          <td>{e.spec_name}</td>
                          <td width="25%">
                              <button className="btn btn-warning" onClick={() => this.open(e)}>Edit</button>
                              <button className="btn btn-danger" onClick={() => this.deleteSpecialty(e)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
              {this.state.alert}
          </main>
          <EditModal show={this.state.showModal} 
                     hide={this.close} 
                     value={this.state.currentItem.spec_name}
                     id={this.state.currentItem.id}/>
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

class EditModal extends TableSpecs {
  constructor(props) {
    super(props);
    this.state = {newSpecName: '', id: null, alert: null};
    this.onChange = this.onChange.bind(this);
    this.edit = this.edit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newSpecName: nextProps.value,
      id: nextProps.id
    });
  }

  onChange(e) {
    var val = e.target.value;
    this.setState({newSpecName: val});
  }

  edit() {
    console.log(this.state.newSpecName);
    let item = {
      id: this.state.id,
      spec_name: this.state.newSpecName
    };
    fetch('http://localhost:8080/edit_spec', {  
      method: 'put',  
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
        const getSuccess = () => (
          <SweetAlert 
            success 
            title="Success" 
            onConfirm={this.hideAlert}
          >
            You edit this specialty!
          </SweetAlert>
        );
        this.setState({
          alert: getSuccess()
        });
      } else {
        const getError = () => (
          <SweetAlert 
            error 
            title="Error" 
            onConfirm={this.hideAlert}
          >
            You can't edit this specialty!
          </SweetAlert>
        );
  
        this.setState({
          alert: getError()
        });
      }
    });
  }

  render() {
    return (
      <div>
          <Modal show={this.props.show} onHide={this.props.hide}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input type="text" name="e_spec_name" className="form-control" defaultValue={this.state.newSpecName} onChange={this.onChange}/>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-warning" onClick={this.edit}>Edit</button>
                    <button className="btn" onClick={this.props.hide}>Close</button>
                  </Modal.Footer>
          </Modal>
              {this.state.alert}
      </div>
       
    )
  }
  
}



export default TableSpecs;
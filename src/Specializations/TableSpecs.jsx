import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import EditSpec from './EditSpec';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {specs: [], alert: null, showModal: false, currentItem: ''};
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.callAlert = this.callAlert.bind(this); 
  }

  componentDidMount() {
    this.getSpecialties();
  }
 
  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      let specs = data;
      this.setState({ specs: specs });
    }).catch(error => {console.log('Error!', error);});
  }

  deleteSpecialty(item) {
    myfetch('delete_spec', 'delete', item)
    .then((data) => {
      console.log(data);
      data.success = JSON.parse(data.success);
      if (data.success) {
        this.setState({specs: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this specialty!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let specs = this.state.specs;
    let ids = specs.map(i => +i.id);
    let index = ids.indexOf(item.id);
    specs.splice(index, 1);
    return specs;
  }

  dataAfterEdit(data) {
    let specs = this.state.specs;
    specs = specs.map(e => (e.id === data.id) ? data : e);
    this.setState({specs: specs});
  }

  // methods for modal
  close() {
    this.setState({ showModal: false,  currentItem: '' });
  }

  async open(e) {
    await this.setState({ showModal: true, currentItem: e});
  }

  // methods for alert
  hideAlert() {
    this.setState({
      alert: null
    });
  }

  callAlert(value) {
    this.setState({
      alert: value
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
          <main>
              <table className="table table-hover">
                  <Thead />
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
          <EditSpec show={this.state.showModal} 
                     hide={this.close} 
                     value={this.state.currentItem}
                     response={this.dataAfterEdit}
                     alert={this.callAlert}
                     hideAlert={this.hideAlert}/>
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

const Thead = () => (
  <thead align="center" className="blue-background bold">
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Actions</td>
    </tr>
  </thead>
)


export default TableSpecs;
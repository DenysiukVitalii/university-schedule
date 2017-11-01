import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateSpec from './CreateSpec';
import EditSpec from './EditSpec';
import Header from '../shared/Header';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {specs: [], createModal: false, editModal: false, currentItem: '', alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
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

  dataAfterCreate() {
    this.getSpecialties();
  }

  // methods for modal
  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
  }

  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
    console.log(this.state.currentItem);
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
        <Header title="Specialties" button="Create specialty" click={this.openCreateModal} />
          <main>
              <table className="table table-hover">
                  <Thead />
                  <tbody>
                    {this.state.specs.map(e => (
                        <tr key={e.id} align="center">
                          <td>{e.id}</td>
                          <td>{e.spec_name}</td>
                          <td width="25%">
                              <button className="btn btn-warning" onClick={() => this.openEditModal(e)}>Edit</button>
                              <button className="btn btn-danger" onClick={() => this.deleteSpecialty(e)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
              {this.state.alert}
          </main>
          <CreateSpec show={this.state.createModal} hide={this.closeCreateModal}
                         alert={this.callAlert} hideAlert={this.hideAlert}
                         response={this.dataAfterCreate}/>
          <EditSpec show={this.state.editModal} hide={this.closeEditModal} 
                    value={this.state.currentItem} response={this.dataAfterEdit}
                    alert={this.callAlert} hideAlert={this.hideAlert}/>
      </div>
    );
  }
}

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
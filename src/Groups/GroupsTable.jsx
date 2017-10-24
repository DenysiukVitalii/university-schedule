import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateGroup from './CreateGroup';

class GroupsTable extends Component {
  constructor() {
    super();
    this.state = {groups: [], specs: [], createModal: false, alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getGroups();
  }
 
  getGroups() {
    myfetch('')
    .then( data => { 
      let groups = data;
      let specs = this.state.specs;
      for (let i = 0; i < groups.length; i++){
        for (let j = 0; j < specs.length; j++){
            if (groups[i].specialtyID === specs[j].id) groups[i].spec_name = specs[j].spec_name;
        }
      }
      this.setState({ groups: groups });
    }).catch(error => {console.log('Error!', error);});
  }

  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      let specs = data;
      this.setState({ specs: specs });
    }).catch(error => {console.log('Error!', error);});
  }

  deleteGroup(item) {
    myfetch('delete_group', 'delete', item)
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
    let groups = this.state.groups;
    let ids = groups.map(i => i.id);
    let index = ids.indexOf(item.id);
    groups.splice(index, 1);
    return groups;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
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

  dataAfterCreate(data) {
    let groups = this.state.groups;
    groups.push(data);
    this.setState({
      groups: groups
    });
  }

  render() {
    return (
      <div className="container">
      <header>
        <h1>Groups</h1>
        <div className="actions">
          <button className="btn" onClick={this.openCreateModal}>Create group</button>
          <Link to="/admin" className="btn">Back</Link>
        </div>
      </header>
        <main>
            <table className="table table-hover">
                <Thead />
                <tbody>
                {this.state.groups.map(e => (
                        <tr key={e.id} align="center">
                          <td>{e.id}</td>
                          <td>{e.spec_name}</td>
                          <td>{e.course}</td>
                          <td>{e.amount_students}</td>
                          <td width="30%">
                              <button className="btn btn-warning">Edit</button>
                              <button className="btn btn-danger" onClick={() => this.deleteGroup(e)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                </tbody>
            </table>
          </main>
          <CreateGroup show={this.state.createModal} 
                     hide={this.closeCreateModal}
                     alert={this.callAlert}
                     response={this.dataAfterCreate}
                     specialties={this.state.specs}
                     hideAlert={this.hideAlert}/>
      </div>
    );
  }
}


const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Group</td>
          <td>Specialty</td>
          <td>Year</td>          
          <td>Amount students</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default GroupsTable;
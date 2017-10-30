import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';

class GroupsTable extends Component {
  constructor() {
    super();
    this.state = {groups: [], specs: [], createModal: false, editModal: false, currentItem: '', alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getGroups();
  }

  getGroups() {
    myfetch('')
    .then( data => {  
      console.log(data);
      this.bindSpecialty(data);
    }).catch(error => {console.log('Error!', error);});
  }

  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      let specs = data;
      console.log(specs);
      this.setState({ specs: specs });
    }).catch(error => {console.log('Error!', error);});
  }

  bindSpecialty(groups) {
    let specs = this.state.specs;
    for (let i = 0; i < groups.length; i++){
      for (let j = 0; j < specs.length; j++){
          if (groups[i].specialtyID === specs[j].id) groups[i].spec_name = specs[j].spec_name;
      }
    }
    this.setState({ groups: groups });
  }

  deleteGroup(item) {
    console.log(item);
    myfetch('delete_group', 'delete', item)
    .then((data) => {
      console.log(data);
      data.success = JSON.parse(data.success);
      console.log(data);
      if (data.success) {
        this.setState({groups: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this group!
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

  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
  }

  // methods for alert
  hideAlert(state) {
    if (!state) {
      this.setState({
        alert: null
      });
    } else {
      this.setState({
        alert: null,
        editModal: false
      });
    }
    
  }

  callAlert(value) {
    this.setState({
      alert: value
    });
  }

  dataAfterCreate(data) {
    this.getGroups();
  }

  dataAfterEdit(data) {
    let groups = this.state.groups;
    let specs = this.state.specs;
    groups = groups.map(e => {
      if (e.id === data.id)  {
        data.id = data.newName;
        delete data.newName;
        specs.forEach(spec => {
          if (data.specialtyID === spec.id) data.spec_name = spec.spec_name;
        });
        return data;
      } else {
        return e;
      }
    });
    this.setState({groups: groups});
  }

  render() {
    return (
      <div className="container">
        <Header click={this.openCreateModal} />
        <main>
          <Table groups={this.state.groups} 
                  openEditModal={(e) => this.openEditModal(e)}
                  deleteGroup={(e) => this.deleteGroup(e)}/>
          {this.state.alert}
        </main>
        <CreateGroup show={this.state.createModal} hide={this.closeCreateModal}
                    alert={this.callAlert} hideAlert={this.hideAlert}
                    response={this.dataAfterCreate} specialties={this.state.specs} />
        <EditGroup show={this.state.editModal} hide={this.closeEditModal} 
                   alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                   item={this.state.currentItem} response={this.dataAfterEdit}
                   specialties={this.state.specs} />
      </div>
    );
  }
}

const Header = props => (
  <header>
    <h1>Groups</h1>
    <div className="actions">
      <button className="btn" onClick={props.click}>Create group</button>
      <Link to="/admin" className="btn">Back</Link>
    </div>
  </header>
);

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.groups.map(e => (
              <tr key={e.id} align="center">
                <td>{e.id}</td>
                <td>{e.spec_name}</td>
                <td>{e.course}</td>
                <td>{e.amount_students}</td>
                <td width="30%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => props.deleteGroup(e)}>Delete</button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
);

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
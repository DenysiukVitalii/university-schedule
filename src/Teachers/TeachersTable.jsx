import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateTeacher from './CreateTeacher';
// import EditTeacher from './EditTeacher';

class TeachersTable extends Component {
  constructor() {
    super();
    this.state = {teachers: [], createModal: false, editModal: false, currentItem: '', alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    // this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    // this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getTeachers();
  }

  getTeachers() {
    myfetch('teachers')
    .then( data => {  
      console.log(data);
      this.setState({teachers: data});
    }).catch(error => {console.log('Error!', error);});
  }

  deleteTeacher(item) {
    console.log(item);
    myfetch('delete_teacher', 'delete',item)
    .then((data) => {
      data.success = JSON.parse(data.success);
      console.log(data);
      if (data.success) {
        this.setState({teachers: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this teacher!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let teachers = this.state.teachers;
    let ids = teachers.map(i => i.id);
    let index = ids.indexOf(item.id);
    teachers.splice(index, 1);
    return teachers;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
  }

  // closeEditModal() {
  //   this.setState({ editModal: false, currentItem: '' });
  // }

  // async openEditModal(item) {
  //   await this.setState({ editModal: true, currentItem: item });
  // }

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
    this.getTeachers();
  }

  // dataAfterEdit(data) {
  //   let groups = this.state.groups;
  //   let specs = this.state.specs;
  //   groups = groups.map(e => {
  //     if (e.id === data.id)  {
  //       data.id = data.newName;
  //       delete data.newName;
  //       specs.forEach(spec => {
  //         if (data.specialtyID === spec.id) data.spec_name = spec.spec_name;
  //       });
  //       return data;
  //     } else {
  //       return e;
  //     }
  //   });
  //   this.setState({groups: groups});
  // }

  render() {
    return (
      <div className="container">
        <Header click={this.openCreateModal} />
         <main>
          <Table teachers={this.state.teachers} 
                 deleteTeacher={(e) => this.deleteTeacher(e)}/>
          {this.state.alert}
        </main>
        <CreateTeacher show={this.state.createModal} hide={this.closeCreateModal}
                       alert={this.callAlert} hideAlert={this.hideAlert}
                       response={this.dataAfterCreate}/>
      </div>
    );
  }
}

const Header = props => (
  <header>
    <h1>Teachers</h1>
    <div className="actions">
      <button className="btn" onClick={props.click}>Create teacher</button>
      <Link to="/admin" className="btn">Back</Link>
    </div>
  </header>
);

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.teachers.map(e => (
              <tr key={e.id} align="center">
                <td>{e.surname} {e.name} {e.lastname}</td>
                <td>{e.position}</td>
                <td>{e.rank}</td>
                <td>{e.phone}</td>
                <td width="30%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => props.deleteTeacher(e)}>Delete</button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Teacher</td>
          <td>Position</td>
          <td>Rank</td>          
          <td>Phone</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default TeachersTable;
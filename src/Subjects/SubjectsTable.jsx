import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateSubject from './CreateSubject';
//import EditTeacher from './EditTeacher';

class SubjectsTable extends Component {
  constructor() {
    super();
    this.state = {subjects: [], createModal: false, editModal: false, currentItem: '', alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
   // this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
   // this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getSubjects();
  }

  getSubjects() {
    myfetch('subjects')
    .then( data => {  
      console.log(data);
      this.setState({subjects: data});
    }).catch(error => {console.log('Error!', error);});
  }

  deleteSubject(item) {
    console.log(item);
    myfetch('delete_subject', 'delete', item)
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
    let subjects = this.state.subjects;
    let ids = subjects.map(i => i.id);
    let index = ids.indexOf(item.id);
    subjects.splice(index, 1);
    return subjects;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
  }

/*  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    console.log(item);
    await this.setState({ editModal: true, currentItem: item });
    console.log(this.state.currentItem);
  }
*/
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
    this.getSubjects();
  }
/*
  dataAfterEdit(data) {
    console.log(data);
    let teachers = this.state.teachers;
    teachers = teachers.map(e => (e.id === data.id) ? data : e);
    this.setState({teachers: teachers});
  }
*/
  render() {
    return (
      <div className="container">
        <Header click={this.openCreateModal} />
         <main>
            <Table subjects={this.state.subjects} 
                    openEditModal={(e) => this.openEditModal(e)}
                    deleteSubject={(e) => this.deleteSubject(e)}/>
              {this.state.alert}
        </main>
        <CreateSubject show={this.state.createModal} hide={this.closeCreateModal}
                       alert={this.callAlert} hideAlert={this.hideAlert}
                       response={this.dataAfterCreate}/>
      </div>
    );
  }
}

const Header = props => (
  <header>
    <h1>Subjects</h1>
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
      {props.subjects.map(e => (
              <tr key={e.id} align="center">
                <td>{e.subject_name}</td>
                <td width="30%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => props.deleteSubject(e)}>Delete</button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Subject</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default SubjectsTable;
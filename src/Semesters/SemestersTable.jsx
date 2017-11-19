import React, { Component } from 'react';
import myfetch from '../myfetch';
import EditSemester from './EditSemester';
import SimpleHeader from '../shared/SimpleHeader';
import FaPencil from 'react-icons/lib/fa/pencil';

class SemestersTable extends Component {
  constructor() {
    super();
    this.state = {semesters: [], editModal: false, currentItem: '', alert: null};
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getSemesters();
  }

  getSemesters() {
    myfetch('semesters')
    .then( data => {  
      this.setState({semesters: data});
    }).catch(error => {console.log('Error!', error);});
  }

  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
    console.log(this.state.currentItem);
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
  
  dataAfterEdit(data) {
    let semesters = this.state.semesters;
    semesters = semesters.map(e => (e.number_semester === data.number_semester) ? data : e);
    this.setState({semesters: semesters});
  }

  render() {
    return (
      <div className="container">
        <SimpleHeader title="Semesters"/>
         <main>
            <Table semesters={this.state.semesters} 
                    openEditModal={(e) => this.openEditModal(e)}/>
              {this.state.alert}
        </main>
        <EditSemester show={this.state.editModal} hide={this.closeEditModal} 
                   alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                   item={this.state.currentItem} response={this.dataAfterEdit}/>
      </div>
    );
  }
}

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.semesters.map(e => (
              <tr key={e.number_semester} align="center">
                <td>{e.number_semester}</td>
                <td>{e.init_data.split('-').reverse().join('.')}</td>
                <td>{e.end_data.split('-').reverse().join('.')}</td>
                <td width="30%">
                    <button className="btn btn-warning" onClick={() => props.openEditModal(e)}><FaPencil/></button>
                </td>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>№ Semester</td>
          <td>Start data</td>
          <td>End data</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default SemestersTable;
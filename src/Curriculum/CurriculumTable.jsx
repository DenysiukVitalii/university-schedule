import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
//import CreateCurriculum from './CreateCurriculum';
//import EditCurriculum from './EditCurriculum';
import Header from '../shared/Header';

class CurriculumTable extends Component {
  constructor() {
    super();
    this.state = {curriculum: [], specs: [], semesters: [], selectedSpec: '',
                  selectedSemester: '',
                  createModal: false, editModal: false, currentItem: '', alert: null};
    this.onChange = this.onChange.bind(this);
    this.getCurriculum = this.getCurriculum.bind(this);
    /*this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);*/
  }

  componentDidMount() {
    this.getSpecialties();
    this.getSemesters();
  }

  getSemesters() {
    myfetch('semesters')
    .then( data => {  
      this.setState({ 
        semesters: data, 
        selectedSemester: data[0].number_semester 
      });
    }).catch(error => {console.log('Error!', error);});
  }

  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      this.setState({ 
        specs: data, 
        selectedSpec: data[0].id 
      });
    }).catch(error => {console.log('Error!', error);});
  }

  getCurriculum() {
    let item = {
      specialtyID: +this.state.selectedSpec,
      semesterID: +this.state.selectedSemester
    }
    console.log(item);
   myfetch('get_curriculum', 'post', item)
    .then( data => { 
      console.log(data);
      this.setState({ curriculum: data });
    }).catch(error => {console.log('Error!', error);});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
 /* deleteGroup(item) {
    myfetch('delete_group', 'delete', item)
    .then((data) => {
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
  }*/

  render() {
    let table = null;
    if (this.state.curriculum.length) {
      table =<Table curriculum={this.state.curriculum}/>;
    } else {
      table = <div className="text-center">Select parameters for curriculum</div>;
    }
    return (
      <div className="container">
        <Header title="Curriculum" button="Create curriculum" click={this.openCreateModal}/>
        <main>
          <section className="get_curriculum">
            <div className="form-group">
                <label htmlFor="selectedSpec">Specialty</label>
                  <select name="selectedSpec" className="form-control" value={this.state.selectedSpec} onChange={this.onChange}>
                      {this.state.specs.map(e => (
                          <option value={e.id} key={e.id}>{e.spec_name}</option>
                      ))}
                  </select>
            </div>
            <div className="form-group">
                <label htmlFor="selectedSemester">Semester</label>
                  <select name="selectedSemester" className="form-control" value={this.state.selectedSemester} onChange={this.onChange}>
                      {this.state.semesters.map(e => (
                          <option value={e.number_semester} key={e.number_semester}>{e.number_semester}</option>
                      ))}
                  </select>
            </div>
            <div className="text-center">
              <button className="btn" onClick={this.getCurriculum}>Get curriculum</button>
            </div>   
          </section>
          
          {table}
          {this.state.alert}
        </main>
        
      </div>
    );
  }
}

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.curriculum.map(e => (
              <tr key={e.id} align="center">
                <td>{e.subject}</td>
                <td>{e.teacher}</td>
                <td>
                  <table>
                      <tbody>
                        {e.types_lesson.map((i, index) => (
                          <tr key={index}>
                            <td>
                             {i.type_lesson}
                            </td>
                          </tr>
                        ))}
                       </tbody>
                  </table>
                </td>
                <td>
                  <table>
                      <tbody>
                        {e.types_lesson.map((i, index) => (
                          <tr key={index}>
                            <td>
                              {i.amount_hours}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
                </td>
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
          <td>Subject</td>
          <td>Teacher</td>
          <td>Type lesson</td>          
          <td>Amount hours</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default CurriculumTable;
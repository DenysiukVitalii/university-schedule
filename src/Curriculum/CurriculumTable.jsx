import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateCurriculum from './CreateCurriculum';
//import EditCurriculum from './EditCurriculum';
import Header from '../shared/Header';

class CurriculumTable extends Component {
  constructor() {
    super();
    this.state = {curriculum: [], specs: [], semesters: [], subjects: [],
                  teachers: [], types_lesson: [], selectedSpec: '', selectedSemester: '', selectedSubject: '',
                  selectedTeacher: '', createModal: false, editModal: false, currentItem: '', alert: null};
    this.onChange = this.onChange.bind(this);
    this.getCurriculum = this.getCurriculum.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    //this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    //this.dataAfterEdit = this.dataAfterEdit.bind(this);
    this.deleteCurriculum = this.deleteCurriculum.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getSemesters();
    this.getSubjects();
    this.getTeachers();
    this.getTypesLesson();
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

  getSubjects() {
    myfetch('subjects')
    .then( data => { 
      this.setState({ 
        subjects: data,
        selectedSubject: data[0].id 
      });
    }).catch(error => {console.log('Error!', error);});
  }

  getTeachers() {
    myfetch('teachers')
    .then( data => { 
      this.setState({ 
        teachers: data,
        selectedTeacher: data[0].id 
      });
    }).catch(error => {console.log('Error!', error);});
  }

  getTypesLesson() {
    myfetch('types_lesson')
    .then( data => { 
      data.forEach(e => {
        e.selected = false;
        e.amount_hours = '';
      });
      this.setState({ 
        types_lesson: data
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
      this.setState({ curriculum: data });
    }).catch(error => {console.log('Error!', error);});
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  deleteCurriculum(item) {
    let obj = {id: item.id};
    console.log(obj);
    myfetch('delete_curriculum', 'delete', obj)
    .then((data) => {
      if (data.success) {
        this.setState({ curriculum: this.deletedItem(obj) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this curriculum!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let curriculum = this.state.curriculum;
    let ids = curriculum.map(i => i.id);
    let index = ids.indexOf(item.id);
    curriculum.splice(index, 1);
    return curriculum;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
    this.setState({
      selectedSemester: this.state.semesters[0].number_semester,
      selectedSpec: this.state.specs[0].id, 
      selectedSubject: this.state.subjects[0].id,
      selectedTeacher: this.state.teachers[0].id,
    })
  }

 /* closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
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
    this.getCurriculum();
  }

/*  dataAfterEdit(data) {
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
    let table = null, 
        selected = {
          spec: this.state.selectedSpec,
          semester: this.state.selectedSemester,
          subject: this.state.selectedSubject,
          teacher: this.state.selectedTeacher
        },
        data = {
          specs: this.state.specs,
          semesters: this.state.semesters,
          subjects: this.state.subjects,
          teachers: this.state.teachers,
          types_lesson: this.state.types_lesson
        };
    if (this.state.curriculum.length) {
      table = <Table curriculum={this.state.curriculum} delete={this.deleteCurriculum}/>;
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
        <CreateCurriculum show={this.state.createModal} hide={this.closeCreateModal}
                          alert={this.callAlert} hideAlert={this.hideAlert}
                          response={this.dataAfterCreate} data={data}
                          selected={selected} />
        
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
                    <button className="btn btn-danger" onClick={() => props.delete(e)}>Delete</button>
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
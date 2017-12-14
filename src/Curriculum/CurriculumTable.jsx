import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateCurriculum from './CreateCurriculum';
import EditCurriculum from './EditCurriculum';
import Table from './Table';
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
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
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
      console.log(data);
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
    console.log("update");
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
  
  deleteCurriculum(item) {
    let obj = {id: item.id};
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

  closeEditModal() {
    this.setState({ editModal: false });
  }

  async openEditModal(item) {
    console.log(item);
    let currentItem = item;
    let selected_types = currentItem.types_lesson.map(i => i.type_lesson);
    let default_types = this.state.types_lesson.map(i => i.type_lesson);
    if (selected_types.length !== default_types.length) {
      for (let i = 0; i < default_types.length; i++) {
        if (!~selected_types.indexOf(default_types[i])) {
          currentItem.types_lesson.push(this.state.types_lesson[i]);
        }
      }
    }
    currentItem.types_lesson.forEach((e, i) => e.id = i + 1);
    
    await this.setState({ editModal: true, currentItem: currentItem });
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
    this.getCurriculum();
  }

  dataAfterEdit(data) {
    this.setState({ curriculum: [] });
  }

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
      table = <Table curriculum={this.state.curriculum} delete={this.deleteCurriculum} 
                     openEditModal={(e) => this.openEditModal(e)}/>;
    } else {
      table = <div className="text-center">No data! Select other parameters for curriculum</div>;
    }

    return (
      <div className="container">
        <Header title="Curriculum" button="Create curriculum" click={this.openCreateModal}/>
        <main>
          <section className="params-form">
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
        <EditCurriculum show={this.state.editModal} hide={this.closeEditModal} 
                        alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                        item={this.state.currentItem} response={this.dataAfterEdit}
                        data={data} />
        
      </div>
    );
  }
}

export default CurriculumTable;
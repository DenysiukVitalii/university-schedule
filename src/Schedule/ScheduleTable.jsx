import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import SimpleHeader from '../shared/SimpleHeader';
import Table from './Table';
import ParamsForm from './ParamsForm';
import CreateSchedule from './CreateSchedule';


class ScheduleTable extends Component {
  constructor() {
    super();
    this.state = {schedule: [], specs: [], groups: [], semesters: [], days: [],
      selectedSpec: '', selectedGroup: '', selectedSemester: '', selectedWeek: 1,
      selectedDay: '', createModal: false, alert: null
    };
    this.onChange = this.onChange.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.addLesson = this.addLesson.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getSemesters();
    this.getDays();
  }

  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      this.setState({ 
        specs: data, 
        selectedSpec: data[0].id 
      });
      this.getGroups(data[0].id);
    }).catch(error => {console.log('Error!', error);});
  }

  getGroups(specID) {
    let obj = {id: specID};
    myfetch('get_groups_by_spec', 'post', obj)
    .then( data => {  
      this.setState({ 
        groups: data,
        selectedGroup: data[0].id
      });
    }).catch(error => {console.log('Error!', error);});
  }

  getDays() {
    myfetch('get_days')
    .then( data => {  
      this.setState({ days: data });
    }).catch(error => {console.log('Error!', error);});
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

  onChange(e) {
    if (e.target.name === 'selectedSpec') {
      this.setState({[e.target.name]: e.target.value});
      this.getGroups(e.target.value);
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
  }

  getSchedule() {
    const obj = {
      groupID: this.state.selectedGroup,
      semesterID: +this.state.selectedSemester,
      number_week: +this.state.selectedWeek
    }
    myfetch('get_schedule', 'post', obj)
    .then( data => {  
      console.log(data);
      this.setState({ 
        schedule: data
      });
    }).catch(error => {console.log('Error!', error);});
  }

  deleteLesson(item) {
    let obj = {id: item.id};
    myfetch('delete_lesson', 'delete', obj)
    .then( data => {  
      if (data.success) {
        this.setState({schedule: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this lesson!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    }).catch(error => {console.log('Error!', error);});
  }

  deletedItem(item) {
    let schedule = this.state.schedule;
    let day = schedule.filter(e => e.day === item.day)[0];
    let ids = day.schedule.map(i => i.number_lesson);
    let index = ids.indexOf(item.number_lesson);
    schedule[day.dayID - 1].schedule[index] = {number_lesson: index + 1};
    return schedule;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
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
    this.getSchedule();
  }

  addLesson(day) {
    console.log(day);
    this.setState({selectedDay: day.id});
    this.openCreateModal();
  }

  render() {
    let params = {
      specs: this.state.specs,
      groups: this.state.groups,
      semesters: this.state.semesters,
      selectedSpec: this.state.selectedSpec,
      selectedSemester: this.state.selectedSemester,
      selectedWeek: this.state.selectedWeek,
      change: this.onChange,
      submit: this.getSchedule
    };
    let table = {
      days: this.state.days,
      schedule: this.state.schedule,
      deleteLesson: (e) => this.deleteLesson(e),
      addLesson: (e) => this.addLesson(e)
    }
    let scheduleTable = this.state.schedule.length ? <Table params={table}/> : 
                   <p className="text-center">Select params for get schedule</p>;
    let selected = {
      spec: this.state.selectedSpec,
      group: this.state.selectedGroup,
      semester: this.state.selectedSemester, 
      week: this.state.selectedWeek
    }
    return (
      <div className="container">
        <SimpleHeader title="Schedule" />
        <main>
          <ParamsForm params={params}/>
          {scheduleTable}
        </main>
        <CreateSchedule show={this.state.createModal} hide={this.closeCreateModal}
                          alert={this.callAlert} hideAlert={this.hideAlert}
                          response={this.dataAfterCreate}
                          day={this.state.selectedDay} />
      </div>
    );
  }
}

export default ScheduleTable;
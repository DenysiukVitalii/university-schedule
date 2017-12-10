import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import myfetch from '../myfetch';
import Select from '../shared/Select';
import Table from './Table';

class App extends Component {
  constructor() {
    super();
    this.state = {groups: [], days: [], schedule: [], semesters: [],
                  selectedGroup: '', selectedWeek: 1, selectedSemester: ''};
    this.onChange = this.onChange.bind(this);
    this.getScheduleByGroup = this.getScheduleByGroup.bind(this);
  }

  componentDidMount() {
   this.getGroups();
   this.getDays();
  }

  getGroups() {
    myfetch('')
    .then( data => { 
      this.setState({ 
        groups: data,
        selectedGroup: data[0].id
      });
      let year = data.filter(e => e.id === data[0].id)[0].course;
      let available_semesters = [year * 2 - 1, year * 2];
      this.setState({semesters: available_semesters, selectedSemester: available_semesters[0]});
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
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
  
  getDays() {
    myfetch('get_days')
    .then( data => {  
      this.setState({ days: data });
    }).catch(error => {console.log('Error!', error);});
  }

  onChange(e) {
    let value = e.target.value;
    if (e.target.name === 'selectedGroup') {
      this.setState({[e.target.name]: value});
      let year = this.state.groups.filter(e => e.id === value)[0].course;
      let available_semesters = [year * 2 - 1, year * 2];
      this.setState({semesters: available_semesters, selectedSemester: available_semesters[0]});
    } else {
      this.setState({[e.target.name]: e.target.value});
    }
    this.setState({schedule: []});
  }

  getScheduleByGroup() {
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

  render() {
    let table = {
      days: this.state.days,
      schedule: this.state.schedule
    }
    let scheduleTable = this.state.schedule.length ? <Table params={table}/> : 
                   <p className="text-center">Select params for get schedule</p>;
    return (
       <div className="container">
         <Header/>
         <div className="params-form">
            <Select title="Group" name="selectedGroup" 
                selected={this.state.selectedGroup} 
                change={this.onChange}
                data={this.state.groups.map(e => (
                        <option value={e.id} key={e.id}>{e.id}</option>
                        ))}/>
           <Select title="Semester" name="selectedSemester" 
                selected={this.state.selectedSemester} 
                change={this.onChange}
                data={this.state.semesters.map(e => (
                        <option value={e} key={e}>{e}</option>
                        ))}/>
           <Select title="Week" name="selectedWeek" 
                selected={this.state.selectedWeek} 
                change={this.onChange}
                data={[1,2].map(e => (<option value={e} key={e}>{e}</option>))}/>
           <div className="text-center">
            <button className="btn" onClick={this.getScheduleByGroup}>Get schedule</button>
           </div>
         </div>
        <main>
          
          {scheduleTable}
        </main>   
       </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <header>
        <h1 className="text-left">University Schedule</h1>
        <Link to="/admin" className="btn">Admin</Link>
      </header>
    );
  }
}

export default App;

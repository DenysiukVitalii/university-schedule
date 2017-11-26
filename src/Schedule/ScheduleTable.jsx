import React, { Component } from 'react';
//import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
/*import CreateCurriculum from './CreateCurriculum';
import EditCurriculum from './EditCurriculum';
import Actions from '../shared/Actions';*/
import SimpleHeader from '../shared/SimpleHeader';
import Select from '../shared/Select';

class ScheduleTable extends Component {
  constructor() {
    super();
    this.state = {
      schedule: [], 
      specs: [],
      groups: [],
      semesters: [], 
      selectedSpec: '', 
      selectedGroup: '',
      selectedSemester: '',
      selectedWeek: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getSemesters();
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
    console.log('get schedule');
  }

  render() {
    return (
      <div className="container">
        <SimpleHeader title="Schedule" />
        <main>
          <ParamsForm specs={this.state.specs} groups={this.state.groups} 
                      semesters={this.state.semesters}  
                      selectedSpec={this.state.selectedSpec} 
                      selectedGroup={this.state.selectedGroup} 
                      selectedSemester={this.state.selectedSemester} 
                      selectedWeek={this.state.selectedWeek} 
                      change={this.onChange} submit={this.getSchedule}/>
        </main>
      </div>
    );
  }
}

const ParamsForm = (props) => (
  <section className="params-form">
      <Select title="Specialty" name="selectedSpec" selected={props.selectedSpec} change={props.change}
              data={props.specs.map(e => (<option value={e.id} key={e.id}>{e.spec_name}</option>))}/>  
      <Select title="Groups" name="selectedGroup" selected={props.selectedGroup} change={props.change}
              data={props.groups.map(e => (<option value={e.id} key={e.id}>{e.id}</option>))}/> 
      <Select title="Semester" name="selectedSemester" selected={props.selectedSemester} change={props.change}
              data={props.semesters.map(e => (
                    <option value={e.number_semester} key={e.number_semester}>{e.number_semester}</option>
                    ))}/>
      <Select title="Week" name="selectedWeek" selected={props.selectedWeek} change={props.change}
              data={[1,2].map(e => (<option value={e} key={e}>{e}</option>))}/>
      <div className="text-center">
        <button className="btn" onClick={props.submit}>Get schedule</button>
      </div>   
  </section>
);

export default ScheduleTable;
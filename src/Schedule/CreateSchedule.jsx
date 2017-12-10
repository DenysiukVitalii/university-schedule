import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import Select from '../shared/Select';
//import InputText from '../shared/InputText';

class CreateSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {subjects: [], available_lessons: [], types_lesson: [], audiences: [],
                      day: '', semester: '', spec: '', group: '', week: '',
                      selectedSubject: null, selectedNumLesson: null,
                      selectedTypeLesson: null, selectedAudience: null};
        this.onChange = this.onChange.bind(this);
        this.createSchedule = this.createSchedule.bind(this);
    }

    componentWillReceiveProps(nextProps) {
       this.setState({
            day: nextProps.selected.day,
            spec: nextProps.selected.spec,
            group: nextProps.selected.group,
            semester: nextProps.selected.semester,
            week: nextProps.selected.week,
            subjects: nextProps.selected.subjects,
            selectedSubject: nextProps.selected.selectedSubject,
            available_lessons: nextProps.selected.available_lessons,
            selectedNumLesson: nextProps.selected.available_lessons[0],
            types_lesson: nextProps.selected.types_lesson,
            selectedTypeLesson: nextProps.selected.selectedTypeLesson
        });
        if (nextProps.show) this.getAudiences();
    }

    getAudiences() {
      myfetch('get_audiences')
      .then( data => {  
        console.log(data);
        this.setState({ audiences: data, selectedAudience: data[0].id });
      }).catch(error => {console.log('Error!', error);});
    }

    onChange(e) {
      this.setState({[e.target.name]: +e.target.value});
      if (e.target.name === 'selectedSubject') {
        this.getTypesLesson(+e.target.value);
      }
    }

    getTypesLesson(value) {
      let obj = {curriculumID: value};
      myfetch('get_types_lesson_by_curr', 'post', obj)
      .then( data => {  
        this.setState({types_lesson: data})
      }).catch(error => {console.log('Error!', error);});
    }

    createSchedule() {
      let obj = {
        groupID: this.state.group,
        semesterID: this.state.semester,
        number_week: +this.state.week,
        dayID: this.state.day.id,
        subjectID: this.state.subjects.filter(e => e.id === this.state.selectedSubject)[0].subjectID,
        teacherID: this.state.subjects.filter(e => e.id === this.state.selectedSubject)[0].teacherID,
        type_lessonID: this.state.selectedTypeLesson,
        audienceID: this.state.selectedAudience,
        number_lesson: this.state.selectedNumLesson
      }
      console.log(obj);
      myfetch('add_lesson', 'post', obj)
      .then( response => {  
        console.log(response);
        if (response.success) { 
          this.props.alert(this.getAlert(true, 'You add new lesson!'));
          this.props.response(); 
        } else {
          if (response.hasOwnProperty('free_teacher')) {
            this.props.alert(this.getAlert(false, "Such teacher is busy! Change day or number lesson, please."));
          } else {
            this.props.alert(this.getAlert(false, "Such audience is busy! Change audience, please."));
          }
        }
      });
    }

    getAlert(state, message) {
      return (state) ? (
          <SweetAlert success title="Success" onConfirm={this.props.hideAlert}>
            {message}
          </SweetAlert>
        ) : (
          <SweetAlert error title="Error" onConfirm={this.props.hideAlert}>
            {message}
          </SweetAlert>
        );
    }

  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton>
                  <Modal.Title>
                      Add lesson for {this.state.group} | {this.state.day.day} | Week: {this.state.week}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Select title="Number lesson" name="selectedNumLesson" 
                          selected={this.state.selectedNumLesson} 
                          change={this.onChange}
                          data={this.state.available_lessons
                                .map(e => (<option value={e} key={e}>{e}</option>))}/>
                  <Select title="Subject/Teacher" name="selectedSubject" 
                          selected={this.state.selectedSubject} 
                          change={this.onChange}
                          data={this.state.subjects
                                .map(e => (<option value={e.id} 
                                     key={e.id}>{e.subject_name} | {e.teacher}</option>))}/>
                  <Select title="Types lesson" name="selectedTypeLesson" 
                          selected={this.state.selectedTypeLesson} 
                          change={this.onChange}
                          data={this.state.types_lesson ? this.state.types_lesson
                                .map(e => (<option value={e.id} 
                                     key={e.id}>{e.type_lesson}({e.amount_hours} hours)</option>)) : <option value="0">no data</option>}/>
                  <Select title="Audience" name="selectedAudience" 
                          selected={this.state.selectedAudience ? this.state.selectedAudience : 1} 
                          change={this.onChange}
                          data={this.state.audiences
                                .map(e => (<option value={e.id} key={e.id}>{e.number_audience}-{e.building}</option>))}/>
                 
                </Modal.Body>
                <ModalFooter action={this.createSchedule} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }


export default CreateSchedule;
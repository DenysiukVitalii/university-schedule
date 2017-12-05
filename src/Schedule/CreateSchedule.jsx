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
        this.state = {subjects: [], available_lessons: [], types_lesson: [], 
                      day: '', semester: '', spec: '', group: '', week: '',
                      selectedSubject: null, selectedNumLesson: null,
                      selectedTypeLesson: null};
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
            selectedSubject: nextProps.selected.subjects[0],
            available_lessons: nextProps.selected.available_lessons,
            selectedNumLesson: nextProps.selected.subjects[0],
            types_lesson: nextProps.selected.subjects[0]
        });
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
      console.log(this.state.selectedTypeLesson);
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
                  {/*<Select title="Types lesson" name="selectedTypeLesson" 
                          selected={this.state.selectedTypeLesson} 
                          change={this.onChange}
                          data={this.state.subjects[0].types_lesson
                                .map(e => (<option value={e.id} 
                                     key={e.id}>{e.type_lesson}</option>))}/>*/}
                  
                 
                </Modal.Body>
                <ModalFooter action={this.createSchedule} hide={this.props.hide} submitText="Create"/>
            </Modal>
        </div>
      )
    }
  }


export default CreateSchedule;
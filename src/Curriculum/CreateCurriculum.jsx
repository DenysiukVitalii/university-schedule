import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
//import InputText from '../shared/InputText';

class CreateCurriculum extends Component {
    constructor(props) {
        super(props);
        this.state = {specs: [], semesters: [], subjects: [], teachers: [], types_lesson: [],
                      selectedSpec: '', selectedSemester: '', selectedSubject: '', 
                      selectedTeacher: ''};
        this.onChange = this.onChange.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.createCurriculum = this.createCurriculum.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            specs: nextProps.data.specs,
            semesters: nextProps.data.semesters,
            subjects: nextProps.data.subjects,
            teachers: nextProps.data.teachers,
            types_lesson: nextProps.data.types_lesson,
            selectedSpec: nextProps.selected.spec,
            selectedSemester: nextProps.selected.semester,
            selectedSubject: nextProps.selected.subject,
            selectedTeacher: nextProps.selected.teacher
        });
    }
    
    componentWillMount() {
      this.selectedCheckboxes = new Set();
    }

    onChange(e) {
      this.setState({[e.target.name]: +e.target.value});
    }

    createCurriculum() {
      let item = {
        specialtyID: this.state.selectedSpec,
        semesterID: this.state.selectedSemester,
        subjectID: this.state.selectedSubject,
        teacherID: this.state.selectedTeacher,
        types_lesson: this.state.types_lesson
      };

      myfetch('create_curriculum', 'post', item)
      .then( data => { 
        if (data.success) { 
          this.clearForm();
          this.props.alert(this.getAlert(true, 'You create new curriculum!'));
          this.props.response(item); 
        } else {
          this.props.alert(this.getAlert(false, "Such curriculum already exist! Rename, please."));
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

    clearForm() {
      let types_lesson = this.state.types_lesson.map(e => { 
        return {
          id: e.id,
          name: e.name,
          selected: false,
          amount_hours: ''
        }
      });
      this.setState({types_lesson: types_lesson});
      document.getElementById("amountHoursForm").reset();
    }

    changeSelection(e) {
      let id = +e.target.getAttribute('data-id');
      let types_lesson = this.state.types_lesson.map(e => {
          e.selected = e.id === id ? !e.selected : e.selected;
          if (!e.selected) e.amount_hours = ''; 
          return {
              id: e.id,
              name: e.name,
              selected: e.selected,
              amount_hours: e.amount_hours
          };
      });
      this.setState({ types_lesson: types_lesson });
    }

    changeAmount(e) {
      let value = +e.target.value;
      let type = +e.target.name;
      let types_lesson = this.state.types_lesson.map(e => {
          e.amount_hours = (e.id === type) ? value : e.amount_hours;
          return {
              id: e.id,
              name: e.name,
              selected: e.selected,
              amount_hours: e.amount_hours
          };
      });
      this.setState({ types_lesson: types_lesson });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create curriculum</Modal.Title></Modal.Header>
                <Modal.Body>
                  <SpecialtySelect value={this.state.selectedSpec}
                                   change={this.onChange}
                                   specs={this.state.specs}/>
                  <SemesterSelect value={this.state.selectedSemester}
                                   change={this.onChange}
                                   semesters={this.state.semesters}/>
                  <SubjectSelect value={this.state.selectedSubject}
                                   change={this.onChange}
                                   subjects={this.state.subjects}/>
                  <TeacherSelect value={this.state.selectedTeacher}
                                   change={this.onChange}
                                   teachers={this.state.teachers}/>
                  <form id="amountHoursForm">
                   <AmountHours change={this.changeSelection} amount={this.changeAmount} types_lesson={this.state.types_lesson}/>
                  </form>

                </Modal.Body>
                <ModalFooter action={this.createCurriculum} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

  const SpecialtySelect = (props) => (
     <div className="form-group">
          <label htmlFor="selectedSpec">Specialty</label>
            <select name="selectedSpec" className="form-control" value={props.value} onChange={props.change}>
                {props.specs.map(e => (
                    <option value={e.id} key={e.id}>{e.spec_name}</option>
                ))}
            </select>
      </div>
  );

  const SemesterSelect = (props) => (
      <div className="form-group">
          <label htmlFor="selectedSemester">Semester</label>
            <select name="selectedSemester" className="form-control" value={props.value} onChange={props.change}>
                {props.semesters.map(e => (
                    <option value={e.number_semester} key={e.number_semester}>{e.number_semester}</option>
                ))}
            </select>
      </div>
  );

 const SubjectSelect = (props) => (
    <div className="form-group">
        <label htmlFor="selectedSubject">Subject</label>
          <select name="selectedSubject" className="form-control" value={props.value} onChange={props.change}>
              {props.subjects.map(e => (
                  <option value={e.id} key={e.id}>{e.subject_name}</option>
              ))}
          </select>
    </div>
  );

  const TeacherSelect = (props) => (
    <div className="form-group">
        <label htmlFor="selectedTeacher">Teacher</label>
          <select name="selectedTeacher" className="form-control" value={props.value} onChange={props.change}>
              {props.teachers.map(e => (
                  <option value={e.id} key={e.id}>{e.surname} {e.name[0]}.{e.lastname[0]}. | {e.position}</option>
              ))}
          </select>
    </div>
  );

  const AmountHours = (props) => (
    <div className="form-group">
        <label htmlFor="selectedTeacher">Types lesson and amount hours</label>
        {props.types_lesson.map(e => (
          <div className="checkbox" key={e.id}>
            <label><input type="checkbox" 
                          data-id={e.id} 
                          defaultChecked={e.selected}
                          onChange={props.change}/>{e.name}</label>
            {e.selected ? (
              <input type="number" name={e.id} value={e.amount} onChange={props.amount} className="input-text" placeholder="Amount hours"/>
              ) : (<div className="no-choosen"></div>)}
          </div>
        ))}
    </div>
  );


export default CreateCurriculum;
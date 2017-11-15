import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
//import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
//import InputText from '../shared/InputText';

class EditCurriculum extends Component {
    constructor(props) {
        super(props);
        this.state = {subjects: [], teachers: [], types_lesson: [],
                      selectedSubject: '', selectedTeacher: '', id_curriculum: ''};
        this.onChange = this.onChange.bind(this);
        this.changeSelection = this.changeSelection.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.editCurriculum = this.editCurriculum.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            subjects: nextProps.data.subjects,
            teachers: nextProps.data.teachers,
            selectedSubject: nextProps.item.subject_id,
            selectedTeacher: nextProps.item.teacher_id,
            id_curriculum: nextProps.item.id,
            types_lesson: nextProps.item.types_lesson
        });
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    editCurriculum() {
      console.log(this.state.types_lesson);
      /*myfetch('edit_group', 'put', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You edited group!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such group already exist! Rename, please."));
        }
      });*/
    }

    getAlert(state, message) {
      return (state) ? (
          <SweetAlert success title="Success" onConfirm={() => this.props.hideAlert(true)}>
            {message}
          </SweetAlert>
        ) : (
          <SweetAlert error title="Error" onConfirm={() => this.props.hideAlert(false)}>
            {message}
          </SweetAlert>
        );
    }

    changeSelection(e) {
      let id = +e.target.getAttribute('data-id');
      let types_lesson = this.state.types_lesson.map(e => {
          e.selected = e.id === id ? !e.selected : e.selected;
          if (!e.selected) e.amount_hours = ''; 
          return {
              id: e.id,
              type_lesson: e.type_lesson,
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
              type_lesson: e.type_lesson,
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
                <Modal.Header closeButton><Modal.Title>Edit group</Modal.Title></Modal.Header>
                <Modal.Body>
                  <SubjectSelect value={this.state.selectedSubject}
                                  change={this.onChange}
                                  subjects={this.state.subjects}/>
                  <TeacherSelect value={this.state.selectedTeacher}
                                  change={this.onChange}
                                  teachers={this.state.teachers}/>
                  <form id="amountHoursForm">
                  <AmountHours change={this.changeSelection} amount={this.changeAmount} 
                               types_lesson={this.state.types_lesson}/>
                  </form>

                </Modal.Body>
                <ModalFooter action={this.editCurriculum} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

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
       <label>Types lesson and amount hours</label>
       {props.types_lesson.map(e => (
         <div className="checkbox" key={e.id}>
           <label><input type="checkbox" 
                         data-id={e.id} 
                         defaultChecked={e.selected}
                         onChange={props.change}/>{e.type_lesson}</label>
           {e.selected ? (
             <input type="number" name={e.id} defaultValue={e.amount_hours} onChange={props.amount} className="input-text" placeholder="Amount hours"/>
             ) : (<div className="no-choosen"></div>)}
         </div>
       ))}
   </div>
 );

export default EditCurriculum;
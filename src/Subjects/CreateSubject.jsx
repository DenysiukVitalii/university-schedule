import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class CreateSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {subject_name: ''};
        this.onChange = this.onChange.bind(this);
        this.createSubject = this.createSubject.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let subject_name = this.state.subject_name,
          nameRegex = /^[a-zA-Z]{3,30}$/;
      return (!subject_name || !nameRegex.test(subject_name)) ? false : true;
    }
  
    createSubject() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        subject_name: this.state.subject_name
      };
   
      myfetch('create_subject', 'post', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You create new subject!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such subject already exist! Rename, please."));
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
        this.inputSubjectName.value = "";
        this.setState({
          subject_name: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create subject</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="subject_name" label="Subject" placeholder="Math"  
                             value={this.state.subject_name} change={this.onChange} 
                             refProp={el => this.inputSubjectName = el}
                             pattern="^[a-zA-Z\s]{3,30}$"/>
                </Modal.Body>
                <ModalFooter action={this.createSubject} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default CreateSubject;
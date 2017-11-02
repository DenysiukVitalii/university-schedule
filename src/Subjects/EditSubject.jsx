import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class EditSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', subject_name: ''};
        this.onChange = this.onChange.bind(this);
        this.editSubject = this.editSubject.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.item.id,
          subject_name: nextProps.item.subject_name
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    validation() {
      let subject_name = this.state.subject_name,
          nameRegex = /^[a-zA-Z\s/+]{3,40}$/;
      return (!subject_name || !nameRegex.test(subject_name)) ? false : true;
    }
  
    editSubject() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        id: this.state.id,
        subject_name: this.state.subject_name,
      };
     
      myfetch('edit_subject', 'put', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You edited subject!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such subject already exist! Rename, please."));
        }
      });
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
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Edit subject</Modal.Title></Modal.Header>
                <Modal.Body>
                <InputText name="subject_name" label="Subject" placeholder="Math"  
                           value={this.state.subject_name} change={this.onChange}
                           pattern="^[a-zA-Z\s/+]{3,40}$" />
                </Modal.Body>
                <ModalFooter action={this.editSubject} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
export default EditSubject;
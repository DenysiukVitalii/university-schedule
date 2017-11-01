import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class CreateTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', surname: '', lastname: '', position: '', rank: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.createTeacher = this.createTeacher.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let group = this.state.newGroupName,
          groupRegex = /^[a-zA-Z]{2}-[0-9]{2}$/,
          amount = this.state.selectedAmount;
      return (!group || !groupRegex.test(group) || !amount) ? false : true;
    }
  
    createTeacher() {
      // if (this.validation() === false) {
      //   this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
      //   return;
      // } 

      let item = {
        name: this.state.name,
        surname: this.state.surname,
        lastname: this.state.lastname,
        position: this.state.position,
        rank: this.state.rank,
        phone: this.state.phone
      };
   
      myfetch('create_teacher', 'post', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You create new teacher!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such teacher already exist! Rename, please."));
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
        this.inputName.value = "";
        this.inputSurname.value = "";
        this.inputLastname.value = "";
        this.inputPosition.value = "";
        this.inputRank.value = "";
        this.inputPhone.value = "";
        this.setState({
          name: '',
          surname: '', 
          lastname: '', 
          position: '', 
          rank: '', 
          phone: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create teacher</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="surname" label="Surname" placeholder="Ivanov" 
                             value={this.state.surname} change={this.onChange} 
                             refProp={el => this.inputSurname = el}/>
                  <InputText name="name" label="Name" placeholder="Ivan" 
                             value={this.state.name} change={this.onChange} 
                             refProp={el => this.inputName = el}/>
                  <InputText name="lastname" label="Lastname" placeholder="Ivanovich"
                             value={this.state.lastname} change={this.onChange} 
                             refProp={el => this.inputLastname = el}/>
                  <InputText name="position" label="Position" placeholder="Professor"
                             value={this.state.position} change={this.onChange} 
                             refProp={el => this.inputPosition = el}/>
                  <InputText name="rank" label="Rank" placeholder="Mathematician"
                             value={this.state.rank} change={this.onChange} 
                             refProp={el => this.inputRank = el}/>
                  <InputText name="phone" label="Phone" placeholder="0674853265" 
                             value={this.state.phone} change={this.onChange} 
                             refProp={el => this.inputPhone = el}/> 
                </Modal.Body>
                <ModalFooter action={this.createTeacher} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default CreateTeacher;
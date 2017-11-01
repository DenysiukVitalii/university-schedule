import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class EditTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', name: '', surname: '', lastname: '', position: '', rank: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.editTeacher = this.editTeacher.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.item.id,
          name: nextProps.item.name,
          surname: nextProps.item.surname,
          lastname: nextProps.item.lastname,
          position: nextProps.item.position,
          rank: nextProps.item.rank,
          phone: nextProps.item.phone
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let group = this.state.newName,
          groupRegex = /^[a-zA-Z]{2}-[0-9]{2}$/,
          amount = this.state.selectedAmount;
      return (!group || !groupRegex.test(group) || !amount) ? false : true;
    }
  
    editTeacher() {
     /* if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } */

      let item = {
        id: this.state.id,
        name: this.state.name,
        surname: this.state.surname,
        lastname: this.state.lastname,
        position: this.state.position,
        rank: this.state.rank,
        phone: this.state.phone
      };
     
      myfetch('edit_teacher', 'put', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You edited teacher!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such teacher already exist! Rename, please."));
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
                <Modal.Header closeButton><Modal.Title>Edit teacher</Modal.Title></Modal.Header>
                <Modal.Body>
                <InputText name="surname" label="Surname" placeholder="Ivanov" 
                             value={this.state.surname} change={this.onChange} />
                  <InputText name="name" label="Name" placeholder="Ivan" 
                             value={this.state.name} change={this.onChange} />
                  <InputText name="lastname" label="Lastname" placeholder="Ivanovich"
                             value={this.state.lastname} change={this.onChange} />
                  <InputText name="position" label="Position" placeholder="Professor"
                             value={this.state.position} change={this.onChange} />
                  <InputText name="rank" label="Rank" placeholder="Mathematician"
                             value={this.state.rank} change={this.onChange} />
                  <InputText name="phone" label="Phone" placeholder="0674853265" 
                             value={this.state.phone} change={this.onChange} /> 
                </Modal.Body>
                <ModalFooter action={this.editTeacher} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default EditTeacher;
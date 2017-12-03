import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
//import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
//import InputText from '../shared/InputText';

class CreateSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {day1: ''};
        this.onChange = this.onChange.bind(this);
        this.createSchedule = this.createSchedule.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            day: nextProps.day
        });
    }

    onChange(e) {
      this.setState({[e.target.name]: +e.target.value});
    }

    createSchedule() {
      console.log('create');
      console.log(this.state.day);
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
                <Modal.Header closeButton><Modal.Title>Create schedule</Modal.Title></Modal.Header>
                <Modal.Body>
                    day: {this.state.day}
                </Modal.Body>
                <ModalFooter action={this.createSchedule} hide={this.props.hide} submitText="Create"/>
            </Modal>
        </div>
      )
    }
  }


export default CreateSchedule;
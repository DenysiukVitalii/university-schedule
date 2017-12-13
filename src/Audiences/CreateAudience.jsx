import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class CreateAudience extends Component {
    constructor(props) {
        super(props);
        this.state = {number_audience: '', building: '', amount_seats: ''};
        this.onChange = this.onChange.bind(this);
        this.createAudience = this.createAudience.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
  
    createAudience() {
      let item = {
        number_audience: +this.state.number_audience,
        building: +this.state.building,
        amount_seats: +this.state.amount_seats
      };

      console.log(item);
   
      myfetch('create_audience', 'post', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You create new audience!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such audience already exist! Rename, please."));
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
        this.inputNumberAudience.value = "";
        this.inputBuilding.value = "";
        this.inputAmountSeats.value = "";
        this.setState({
          number_audience: '',
          building: '',
          amount_seats: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create audience</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText type="number" name="number_audience" label="Number audience"  
                             value={this.state.number_audience} change={this.onChange} 
                             refProp={el => this.inputNumberAudience = el}/>
                  <InputText type="number" name="building" label="Building"  
                             value={this.state.building} change={this.onChange} 
                             refProp={el => this.inputBuilding = el}/>
                  <InputText type="number" name="amount_seats" label="Amount seats"  
                             value={this.state.amount_seats} change={this.onChange} 
                             refProp={el => this.inputAmountSeats = el}/>
                </Modal.Body>
                <ModalFooter action={this.createAudience} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default CreateAudience;
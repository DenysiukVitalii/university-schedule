import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class EditAudience extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', number_audience: '', building: '', amount_seats: ''};
        this.onChange = this.onChange.bind(this);
        this.editAudience = this.editAudience.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.item.id,
          number_audience: nextProps.item.number_audience,
          building: nextProps.item.building,
          amount_seats: nextProps.item.amount_seats
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
  
    editAudience() {
      let item = {
        id: this.state.id,
        number_audience: +this.state.number_audience,
        building: +this.state.building,
        amount_seats: +this.state.amount_seats
      };

      console.log(item);
     
      myfetch('edit_audience', 'put', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You edited audience!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such audience already exist! Rename, please."));
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
                <Modal.Header closeButton><Modal.Title>Edit audience</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText type="number" name="number_audience" label="Number audience"  
                              value={this.state.number_audience} change={this.onChange} />
                  <InputText type="number" name="building" label="Building"  
                              value={this.state.building} change={this.onChange} />
                  <InputText type="number" name="amount_seats" label="Amount seats"  
                              value={this.state.amount_seats} change={this.onChange} />
                </Modal.Body>
                <ModalFooter action={this.editAudience} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
export default EditAudience;
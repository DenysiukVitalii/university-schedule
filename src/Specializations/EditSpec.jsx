import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class EditSpec extends Component {
    constructor(props) {
      super(props);
      this.state = {newSpecName: ''};
      this.onChange = this.onChange.bind(this);
      this.editSpecialty = this.editSpecialty.bind(this);
    }
  
    componentWillReceiveProps(nextProps) {
      this.setState({
        newSpecName: nextProps.value.spec_name
      });
    }
  
    onChange(e) {
      var val = e.target.value;
      this.setState({newSpecName: val});
    }
    
    validation() {
      let spec_name = this.state.newSpecName,
          nameRegex = /^[a-zA-Z\s]{3,40}$/;
      return (!spec_name || !nameRegex.test(spec_name)) ? false : true;
    }
  
    editSpecialty() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        id: this.props.value.id,
        spec_name: this.state.newSpecName
      };
  
      myfetch('edit_spec', 'put', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You edit this specialty!'));
          this.props.response(item);  
        } else {
          this.props.alert(this.getAlert(false, "Such specialty already exist! Rename, please."));
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
                <Modal.Header closeButton><Modal.Title>Edit Specialty</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="e_spec_name" label="Specialty name" placeholder="Software Engineering" 
                             value={this.state.newSpecName} change={this.onChange}
                             pattern="^[a-zA-Z\s/+]{3,40}$" />
                </Modal.Body>
                <ModalFooter action={this.editSpecialty} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default EditSpec;
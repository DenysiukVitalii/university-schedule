import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import InputText from '../shared/InputText';
import ModalFooter from '../shared/ModalFooter';

class CreateSpec extends Component {
    constructor(props) {
        super(props);
        this.state = {spec_name: ''};
        this.onChange = this.onChange.bind(this);
        this.createSpecialty = this.createSpecialty.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let spec_name = this.state.spec_name,
          nameRegex = /^[a-zA-Z]{3,40}$/;
      return (!spec_name || !nameRegex.test(spec_name)) ? false : true;
    }
  
    createSpecialty() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        spec_name: this.state.spec_name
      };
   
      myfetch('create_spec', 'post', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You create new specialty!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such specialty already exist! Rename, please."));
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
        this.inputSpecName.value = "";
        this.setState({
          spec_name: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create specialty</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="spec_name" label="Specialty name" placeholder="Software Engineering" 
                             value={this.state.spec_name} change={this.onChange} 
                             refProp={el => this.inputSpecName = el}
                             pattern="^[a-zA-Z\s/+]{3,40}$"/>
                </Modal.Body>
                <ModalFooter action={this.createSpecialty} hide={this.props.hide} submitText="Create"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default CreateSpec;

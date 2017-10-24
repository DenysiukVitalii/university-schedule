import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

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
  
    editSpecialty() {
      let item = {
        id: this.props.value.id,
        spec_name: this.state.newSpecName
      };
  
      myfetch('edit_spec', 'put', item)
      .then( data => { 
        data.success = JSON.parse(data.success);
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
                <Modal.Header closeButton><Modal.Title>Edit Specialty</Modal.Title></Modal.Header>
                <Modal.Body>
                  <label htmlFor="e_spec_name">Specialty name</label>
                  <input type="text" name="e_spec_name" className="form-control" 
                         defaultValue={this.state.newSpecName} onChange={this.onChange}/>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-warning" onClick={this.editSpecialty}>Edit</button>
                  <button className="btn" onClick={this.props.hide}>Close</button>
                </Modal.Footer>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default EditSpec;
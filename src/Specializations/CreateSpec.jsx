import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

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
  
    createSpecialty() {
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
                  <SubjectInput defValue={this.state.spec_name} 
                             change={this.onChange} 
                             refProp={el => this.inputSpecName = el}/>
                </Modal.Body>
                <Footer create={this.createSpecialty} hide={this.props.hide}/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
  const Footer = (props) => (
      <Modal.Footer>
        <button type="submit" className="btn btn-warning" onClick={props.create}>Create</button>
        <button className="btn" onClick={props.hide}>Close</button>
      </Modal.Footer>
  )

  const SubjectInput = (props) => (
    <div className="form-group">
      <label htmlFor="spec_name">Specialty</label>
          <input type="text" name="spec_name" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Software Engineering"/>
    </div>
  );


export default CreateSpec;
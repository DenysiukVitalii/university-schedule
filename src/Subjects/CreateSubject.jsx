import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class CreateSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {subject_name: ''};
        this.onChange = this.onChange.bind(this);
        this.createSubject = this.createSubject.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
  
    createSubject() {
      let item = {
        subject_name: this.state.subject_name
      };
   
      myfetch('create_subject', 'post', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You create new subject!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such subject already exist! Rename, please."));
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
        this.inputSubjectName.value = "";
        this.setState({
          subject_name: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create subject</Modal.Title></Modal.Header>
                <Modal.Body>
                  <SubjectInput defValue={this.state.subject_name} 
                             change={this.onChange} 
                             refProp={el => this.inputSubjectName = el}/>
                </Modal.Body>
                <Footer create={this.createSubject} hide={this.props.hide}/>
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
      <label htmlFor="subject_name">Subject</label>
          <input type="text" name="subject_name" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Math"/>
    </div>
  );


export default CreateSubject;
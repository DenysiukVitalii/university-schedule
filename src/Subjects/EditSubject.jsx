import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class EditSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', subject_name: ''};
        this.onChange = this.onChange.bind(this);
        this.editSubject = this.editSubject.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.item.id,
          subject_name: nextProps.item.subject_name
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
  
    editSubject() {
      let item = {
        id: this.state.id,
        subject_name: this.state.subject_name,
      };
     
      myfetch('edit_subject', 'put', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You edited subject!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such subject already exist! Rename, please."));
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
                <SubjectInput value={this.state.subject_name} 
                              change={this.onChange} />
                </Modal.Body>
                <Footer edit={this.editSubject} hide={this.props.hide}/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

  const Footer = (props) => (
    <Modal.Footer>
        <button className="btn btn-warning" onClick={props.edit}>Edit</button>
        <button className="btn" onClick={props.hide}>Close</button>
    </Modal.Footer>
  );

  const SubjectInput = (props) => (
    <div className="form-group">
      <label htmlFor="subject_name">Subject</label>
          <input type="text" name="subject_name" className="form-control" 
                  defaultValue={props.value} onChange={props.change} placeholder="Math"/>
    </div>
  );



export default EditSubject;
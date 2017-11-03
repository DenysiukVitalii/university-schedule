import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';

class EditSemester extends Component {
    constructor(props) {
        super(props);
        this.state = {number_semester: '', init_data: '', end_data: ''};
        this.onChange = this.onChange.bind(this);
        this.editSemester = this.editSemester.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          number_semester: nextProps.item.number_semester,
          init_data: nextProps.item.init_data,
          end_data: nextProps.item.end_data
        });
    }

    onChange(e) {
      console.log(e.target.value);
        this.setState({[e.target.name]: e.target.value});
    }
    
    editSemester() {
      let item = {
        number_semester: this.state.number_semester,
        init_data: this.state.init_data,
        end_data: this.state.end_data
      };
     
      myfetch('edit_semester', 'put', item)
      .then( data => { 
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You edited semester!'));
          this.props.response(item);
        } else {
          console.log(data);
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
                <Modal.Header closeButton><Modal.Title>Edit semester № {this.state.number_semester}</Modal.Title></Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="init_data">Start data</label>
                    <input type="date" name="init_data" className="form-control" defaultValue={this.state.init_data} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="end_data">End data</label>
                    <input type="date" name="end_data" className="form-control" defaultValue={this.state.end_data} onChange={this.onChange}/>
                  </div>
                </Modal.Body>
                <ModalFooter action={this.editSemester} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
export default EditSemester;
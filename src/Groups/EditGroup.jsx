import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {specs: [], groupName: '', newName:'', selectedSpec: '', selectedYear: '' , selectedAmount: ''};
        this.onChange = this.onChange.bind(this);
        this.editGroup = this.editGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            specs: nextProps.specialties,
            groupName: nextProps.item.id,
            selectedSpec: nextProps.item.specialtyID,
            selectedYear: nextProps.item.course,
            selectedAmount: nextProps.item.amount_students
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
  
    editGroup() {
      let item = {
        id: this.state.groupName,
        newName: this.state.newName,
        specialtyID: +this.state.selectedSpec,
        course: +this.state.selectedYear,
        amount_students: +this.state.selectedAmount
      };
     
      console.log(item);
      myfetch('edit_group', 'put', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You edited group!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such group already exist! Rename, please."));
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
                <Modal.Header closeButton><Modal.Title>Edit group</Modal.Title></Modal.Header>
                <Modal.Body>
                  <GroupNameInput value={this.state.groupName} 
                                  change={this.onChange} />
                  <SpecialtySelect value={this.state.selectedSpec}
                                   change={this.onChange}
                                   specs={this.state.specs}/>
                  <YearSelect value={this.state.selectedYear} change={this.onChange}/>
                  <AmountStudentsInput value={this.state.selectedAmount} change={this.onChange} />
                </Modal.Body>
                <Footer edit={this.editGroup} hide={this.props.hide}/>
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

  const GroupNameInput = (props) => (
    <div className="form-group">
      <label htmlFor="newName">Group name (For example: XX-11)</label>
          <input type="text" name="newName" className="form-control" 
                  defaultValue={props.value} onChange={props.change}/>
    </div>
  );

  const SpecialtySelect = (props) => (
     <div className="form-group">
          <label htmlFor="selectedSpec">Specialty</label>
            <select name="selectedSpec" className="form-control" value={props.value} onChange={props.change}>
                {props.specs.map(e => (
                    <option value={e.id} key={e.id}>{e.spec_name}</option>
                ))}
            </select>
      </div>
  );

  const YearSelect = (props) => (
     <div className="form-group">
        <label htmlFor="selectedYear">Year</label>
            <select name="selectedYear" className="form-control" value={props.value} onChange={props.change}>
                {[1,2,3,4,5,6].map(el => (
                    <option value={el} key={el}>{el}</option>
                ))}
            </select>
      </div>
  );

  const AmountStudentsInput = (props) => (
      <div className="form-group">
        <label htmlFor="selectedAmount">Amount of students</label>
        <input type="number" name="selectedAmount" className="form-control" defaultValue={props.value} onChange={props.change} min="1" max="45"/>
      </div>
  );

export default EditGroup;
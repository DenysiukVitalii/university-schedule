import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class EditGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {specs: [], groupName: '', newName: '', selectedSpec: '', selectedYear: '' , selectedAmount: ''};
        this.onChange = this.onChange.bind(this);
        this.editGroup = this.editGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            specs: nextProps.specialties,
            groupName: nextProps.item.id,
            newName: nextProps.item.id,
            selectedSpec: nextProps.item.specialtyID,
            selectedYear: nextProps.item.course,
            selectedAmount: nextProps.item.amount_students
        });
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let group = this.state.newName,
          groupRegex = /^[a-zA-Z]{2}-[0-9]{2}$/,
          amount = this.state.selectedAmount;
      return (!group || !groupRegex.test(group) || !amount) ? false : true;
    }
  
    editGroup() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        id: this.state.groupName,
        newName: this.state.newName.toUpperCase(),
        specialtyID: +this.state.selectedSpec,
        course: +this.state.selectedYear,
        amount_students: +this.state.selectedAmount
      };
     
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
                <Modal.Header closeButton><Modal.Title>Edit group</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="newName" label="Group name" placeholder="XX-11" 
                             value={this.state.groupName} change={this.onChange} />
                  <SpecialtySelect value={this.state.selectedSpec}
                                   change={this.onChange}
                                   specs={this.state.specs}/>
                  <YearSelect value={this.state.selectedYear} change={this.onChange}/>
                  <AmountStudentsInput value={this.state.selectedAmount} change={this.onChange} />
                </Modal.Body>
                <ModalFooter action={this.editGroup} hide={this.props.hide} submitText="Edit"/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

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
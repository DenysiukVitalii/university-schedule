import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';
import ModalFooter from '../shared/ModalFooter';
import InputText from '../shared/InputText';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {specs: [], newGroupName: '', selectedSpec: '', selectedYear: '1' , selectedAmount: ''};
        this.onChange = this.onChange.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            specs: nextProps.specialties
        });
        if (this.state.specs.length) {
          this.setState({
              selectedSpec: this.state.specs[0].id
          });
        }
    }

    onChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    validation() {
      let group = this.state.newGroupName,
          groupRegex = /^[a-zA-Z]{2}-[0-9]{2}$/,
          amount = this.state.selectedAmount;
      return (!group || !groupRegex.test(group) || !amount) ? false : true;
    }
  
    createGroup() {
      if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } 

      let item = {
        id: this.state.newGroupName.toUpperCase(),
        specialtyID: +this.state.selectedSpec,
        course: this.state.selectedYear,
        amount_students: this.state.selectedAmount
      };
   
      myfetch('create_group', 'post', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You create new group!'));
          this.props.response(item);  
          this.clearForm();
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

    clearForm() {
        this.inputGroupName.value = "";
        this.inputAmount.value = "";
        this.inputYear.value = '1';
        this.setState({
          selectedYear: '1',
          newGroupName: '',
          selectedSpec: this.state.specs[0].id
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create group</Modal.Title></Modal.Header>
                <Modal.Body>
                  <InputText name="newGroupName" label="Group name" placeholder="XX-11" 
                             value={this.state.newGroupName} change={this.onChange} 
                             refProp={el => this.inputGroupName = el}/>
                  <SpecialtySelect value={this.state.selectedSpec}
                                   change={this.onChange}
                                   specs={this.state.specs}/>
                  <YearSelect change={this.onChange} refProp={el => this.inputYear = el}/>
                  <AmountStudentsInput change={this.onChange} refProp={el => this.inputAmount = el} />
                </Modal.Body>
                <ModalFooter action={this.createGroup} hide={this.props.hide} submitText="Create"/>
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
            <select name="selectedYear" className="form-control" onChange={props.change} ref={props.refProp}>
                {[1,2,3,4,5,6].map(el => (
                    <option value={el} key={el}>{el}</option>
                ))}
            </select>
      </div>
  );

  const AmountStudentsInput = (props) => (
      <div className="form-group">
        <label htmlFor="selectedAmount">Amount of students</label>
        <input type="number" name="selectedAmount" className="form-control" onChange={props.change} ref={props.refProp} placeholder="25"/>
      </div>
  );

export default CreateGroup;
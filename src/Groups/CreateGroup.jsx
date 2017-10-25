import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

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
  
    createGroup() {
      let item = {
        id: this.state.newGroupName,
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
                  <GroupNameInput defValue={this.state.newGroupName} 
                                  change={this.onChange} 
                                  refProp={el => this.inputGroupName = el}/>
                  <SpecialtySelect value={this.state.selectedSpec}
                                   change={this.onChange}
                                   specs={this.state.specs}/>
                  <YearSelect change={this.onChange} refProp={el => this.inputYear = el}/>
                  <AmountStudentsInput change={this.onChange} refProp={el => this.inputAmount = el} />
                </Modal.Body>
                <Footer create={this.createGroup} hide={this.props.hide}/>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }
  
  const Footer = (props) => (
      <Modal.Footer>
        <button className="btn btn-warning" onClick={props.create}>Create</button>
        <button className="btn" onClick={props.hide}>Close</button>
      </Modal.Footer>
  )

  const GroupNameInput = (props) => (
    <div className="form-group">
      <label htmlFor="newGroupName">Group name (For example: XX-11)</label>
          <input type="text" name="newGroupName" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp}/>
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
        <input type="number" name="selectedAmount" className="form-control" onChange={props.change} min="1" max="45" ref={props.refProp}/>
      </div>
  );

export default CreateGroup;
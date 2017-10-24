import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {specs: [], newGroupName: '', selectedSpec: '', selectedYear: '1' , selectedAmount: ''};
        this.onChange = this.onChange.bind(this);
        this.selectSpec = this.selectSpec.bind(this);
        this.selectYear = this.selectYear.bind(this);
        this.selectAmount = this.selectAmount.bind(this);
        this.createGroup = this.createGroup.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            specs: nextProps.specialties,
            selectedSpec: nextProps.specialties[0].id
        });
    }

    onChange(e) {
        let val = e.target.value;
        this.setState({newGroupName: val});
    }

    selectSpec(e) {
        let val = e.target.value;
        this.setState({selectedSpec: val});
    }

    selectYear(e) {
        let val = e.target.value;
        this.setState({selectedYear: val});
    }

    selectAmount(e) {
        let val = e.target.value;
        this.setState({selectedAmount: val});
    }
  
    createGroup() {
      let item = {
        id: this.state.newGroupName,
        specialtyID: this.state.selectedSpec,
        course: this.state.selectedYear,
        amount_students: this.state.selectedAmount
      };
      console.log(item);
  
      myfetch('create_group', 'post', item)
      .then( data => { 
        data.success = JSON.parse(data.success);
        if (data.success) {
          this.props.alert(this.getAlert(true, 'You create new group!'));
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
        console.log(this.state.selectedSpec);
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create group</Modal.Title></Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="group_name">Group name (For example: XX-11)</label>
                        <input type="text" name="group_name" className="form-control" 
                                defaultValue={this.state.newGroupName} onChange={this.onChange}/>
                  </div>
                  <div className="form-group">
                      <label htmlFor="spec">Specialty</label>
                        <select name="spec" className="form-control" value={this.state.selectedSpec} onChange={this.selectSpec}>
                            {this.state.specs.map(e => (
                                <option value={e.id} key={e.id}>{e.spec_name}</option>
                            ))}
                        </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectedYear">Year</label>
                        <select name="year" className="form-control" onChange={this.selectYear}>
                            {[1,2,3,4,5,6].map(el => (
                                <option value={el} key={el}>{el}</option>
                            ))}
                        </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="amount_students">Amount of students</label>
                    <input type="number" name="amount_students" className="form-control" onChange={this.selectAmount} min="1" max="45"/>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-warning" onClick={this.createGroup}>Create</button>
                  <button className="btn" onClick={this.props.hide}>Close</button>
                </Modal.Footer>
            </Modal>
            {this.state.alert}
        </div>
      )
    }
  }

export default CreateGroup;
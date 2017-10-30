import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class CreateTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', surname: '', lastname: '', position: '', rank: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.createTeacher = this.createTeacher.bind(this);
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
  
    createTeacher() {
      // if (this.validation() === false) {
      //   this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
      //   return;
      // } 

      let item = {
        name: this.state.name,
        surname: this.state.surname,
        lastname: this.state.lastname,
        position: this.state.position,
        rank: this.state.rank,
        phone: this.state.phone
      };
   
      myfetch('create_teacher', 'post', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You create new teacher!'));
          this.props.response(item);  
          this.clearForm();
        } else {
          this.props.alert(this.getAlert(false, "Such teacher already exist! Rename, please."));
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
        this.inputName.value = "";
        this.inputSurname.value = "";
        this.inputLastname.value = "";
        this.inputPosition.value = "";
        this.inputRank.value = "";
        this.setState({
          name: '',
          surname: '', 
          lastname: '', 
          position: '', 
          rank: '', 
          phone: ''
        });
    }
  
    render() {
      return (
        <div>
            <Modal show={this.props.show} onHide={this.props.hide}>
                <Modal.Header closeButton><Modal.Title>Create teacher</Modal.Title></Modal.Header>
                <Modal.Body>
                  <SurnameInput defValue={this.state.surname} 
                             change={this.onChange} 
                             refProp={el => this.inputSurname = el}/>
                  <NameInput defValue={this.state.name} 
                             change={this.onChange} 
                             refProp={el => this.inputName = el}/>
                  <LastnameInput defValue={this.state.lastname} 
                             change={this.onChange} 
                             refProp={el => this.inputLastname = el}/>
                  <PositionInput defValue={this.state.position} 
                             change={this.onChange} 
                             refProp={el => this.inputPosition = el}/>
                  <RankInput defValue={this.state.rank} 
                             change={this.onChange} 
                             refProp={el => this.inputRank = el}/>
                  <PhoneInput defValue={this.state.phone} 
                             change={this.onChange} 
                             refProp={el => this.inputPhone = el}/> 
                </Modal.Body>
                <Footer create={this.createTeacher} hide={this.props.hide}/>
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

  const SurnameInput = (props) => (
    <div className="form-group">
      <label htmlFor="surname">Surname</label>
          <input type="text" name="surname" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Ivanov"/>
    </div>
  );
 
  const NameInput = (props) => (
    <div className="form-group">
      <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Ivan"/>
    </div>
  );

  const LastnameInput = (props) => (
    <div className="form-group">
      <label htmlFor="lastname">Lastname</label>
          <input type="text" name="lastname" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Ivanovich"/>
    </div>
  );

  const PositionInput = (props) => (
    <div className="form-group">
      <label htmlFor="position">Position</label>
          <input type="text" name="position" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Mathematician"/>
    </div>
  );

  const RankInput = (props) => (
    <div className="form-group">
      <label htmlFor="rank">Rank</label>
          <input type="text" name="rank" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="Professor"/>
    </div>
  );
  
  const PhoneInput = (props) => (
    <div className="form-group">
      <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" 
                  defaultValue={props.defVal} onChange={props.change} 
                  ref={props.refProp} placeholder="0674853265"/>
    </div>
  );

export default CreateTeacher;
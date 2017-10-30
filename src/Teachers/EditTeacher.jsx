import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class EditTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {id: '', name: '', surname: '', lastname: '', position: '', rank: '', phone: ''};
        this.onChange = this.onChange.bind(this);
        this.editTeacher = this.editTeacher.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          id: nextProps.item.id,
          name: nextProps.item.name,
          surname: nextProps.item.surname,
          lastname: nextProps.item.lastname,
          position: nextProps.item.position,
          rank: nextProps.item.rank,
          phone: nextProps.item.phone
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
  
    editTeacher() {
     /* if (this.validation() === false) {
        this.props.alert(this.getAlert(false, "Fill all fields correctly, please!"));
        return;
      } */

      let item = {
        id: this.state.id,
        name: this.state.name,
        surname: this.state.surname,
        lastname: this.state.lastname,
        position: this.state.position,
        rank: this.state.rank,
        phone: this.state.phone
      };
     
      myfetch('edit_teacher', 'put', item)
      .then( data => { 
        if (JSON.parse(data.success)) {
          this.props.alert(this.getAlert(true, 'You edited teacher!'));
          this.props.response(item);
        } else {
          this.props.alert(this.getAlert(false, "Such teacher already exist! Rename, please."));
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
                <SurnameInput value={this.state.surname} 
                              change={this.onChange} />
                <NameInput value={this.state.name} 
                           change={this.onChange} />
                <LastnameInput value={this.state.lastname} 
                               change={this.onChange}/>
                <PositionInput value={this.state.position} 
                            change={this.onChange}/>
                <RankInput value={this.state.rank} 
                            change={this.onChange}/>
                <PhoneInput value={this.state.phone} 
                            change={this.onChange}/> 
                </Modal.Body>
                <Footer edit={this.editTeacher} hide={this.props.hide}/>
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

  const SurnameInput = (props) => (
    <div className="form-group">
      <label htmlFor="surname">Surname</label>
          <input type="text" name="surname" className="form-control" 
                  defaultValue={props.value} onChange={props.change}
                  placeholder="Ivanov"/>
    </div>
  );
 
  const NameInput = (props) => (
    <div className="form-group">
      <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" 
                  defaultValue={props.value} onChange={props.change} 
                  placeholder="Ivan"/>
    </div>
  );

  const LastnameInput = (props) => (
    <div className="form-group">
      <label htmlFor="lastname">Lastname</label>
          <input type="text" name="lastname" className="form-control" 
                  defaultValue={props.value} onChange={props.change} 
                  placeholder="Ivanovich"/>
    </div>
  );

  const PositionInput = (props) => (
    <div className="form-group">
      <label htmlFor="position">Position</label>
          <input type="text" name="position" className="form-control" 
                  defaultValue={props.value} onChange={props.change} 
                  placeholder="Mathematician"/>
    </div>
  );

  const RankInput = (props) => (
    <div className="form-group">
      <label htmlFor="rank">Rank</label>
          <input type="text" name="rank" className="form-control" 
                  defaultValue={props.value} onChange={props.change} 
                  placeholder="Professor"/>
    </div>
  );
  
  const PhoneInput = (props) => (
    <div className="form-group">
      <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" className="form-control" 
                  defaultValue={props.value} onChange={props.change} 
                  placeholder="0674853265"/>
    </div>
  );

export default EditTeacher;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal } from 'react-bootstrap';
import myfetch from '../myfetch';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {specs: [], alert: null, showModal: false, currentItem: ''};
    this.getSpecialties = this.getSpecialties.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.callAlert = this.callAlert.bind(this); 
  }

  componentDidMount() {
    this.getSpecialties();
  }
 
  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      let specs = data;
      this.setState({ specs: specs });
    }).catch(error => {console.log('Error!', error);});
  }

  deleteSpecialty(item) {
    myfetch('delete_spec', 'delete', item)
    .then((data) => {
      console.log(data);
      data.success = JSON.parse(data.success);
      if (data.success) {
        this.setState({specs: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this specialty!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    }).catch(error => {console.log('Error!', error);});
  }

  deletedItem(item) {
    let specs = this.state.specs;
    let ids = specs.map(i => +i.id);
    let index = ids.indexOf(item.id);
    specs.splice(index, 1);
    return specs;
  }

  dataAfterEdit(data) {
    let specs = this.state.specs;
    specs = specs.map(e => (e.id === data.id) ? data : e);
    this.setState({specs: specs});
  }

  // methods for modal
  close() {
    this.setState({ showModal: false,  currentItem: '' });
  }

  async open(e) {
    await this.setState({ showModal: true, currentItem: e});
  }

  // methods for alert
  hideAlert() {
    this.setState({
      alert: null
    });
  }

  callAlert(value) {
    this.setState({
      alert: value
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
          <main>
              <table className="table table-hover">
                  <Thead />
                  <tbody>
                    {this.state.specs.map(e => (
                        <tr key={e.id} align="center">
                          <td>{e.id}</td>
                          <td>{e.spec_name}</td>
                          <td width="25%">
                              <button className="btn btn-warning" onClick={() => this.open(e)}>Edit</button>
                              <button className="btn btn-danger" onClick={() => this.deleteSpecialty(e)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
              </table>
              {this.state.alert}
          </main>
          <EditModal show={this.state.showModal} 
                     hide={this.close} 
                     value={this.state.currentItem}
                     response={this.dataAfterEdit}
                     alert={this.callAlert}
                     hideAlert={this.hideAlert}/>
      </div>
    );
  }
}

class EditModal extends TableSpecs {
  constructor(props) {
    super(props);
    this.state = {newSpecName: ''};
    this.onChange = this.onChange.bind(this);
    this.editSpecialty = this.editSpecialty.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      newSpecName: nextProps.value.spec_name
    });
  }

  onChange(e) {
    var val = e.target.value;
    this.setState({newSpecName: val});
  }

  editSpecialty() {
    let item = {
      id: this.props.value.id,
      spec_name: this.state.newSpecName
    };

    myfetch('edit_spec', 'put', item)
    .then( data => { 
      data.success = JSON.parse(data.success);
      if (data.success) {
        const getSuccess = () => (
          <SweetAlert success title="Success" onConfirm={this.props.hideAlert}>
            You edit this specialty!
          </SweetAlert>
        );
        this.props.alert(getSuccess());
        this.props.response(item);  
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.props.hideAlert}>
            You can't edit this specialty!
          </SweetAlert>
        );
        this.props.alert(getError());
      }
    });
  }

  render() {
    return (
      <div>
          <Modal show={this.props.show} onHide={this.props.hide}>
              <Modal.Header closeButton><Modal.Title>Edit Specialty</Modal.Title></Modal.Header>
              <Modal.Body>
                <input type="text" name="e_spec_name" className="form-control" 
                       defaultValue={this.state.newSpecName} onChange={this.onChange}/>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-warning" onClick={this.editSpecialty}>Edit</button>
                <button className="btn" onClick={this.props.hide}>Close</button>
              </Modal.Footer>
          </Modal>
          {this.state.alert}
      </div>
    )
  }
}

const Header = () => (
  <header>
    <h1>TableSpecs</h1>
    <div className="actions">
      <Link to="/newspec" className="btn">Create Spec</Link>
      <Link to="/admin" className="btn">Back</Link>
    </div>
  </header>
);

const Thead = () => (
  <thead align="center" className="blue-background bold">
    <tr>
        <td>Id</td>
        <td>Name</td>
        <td>Actions</td>
    </tr>
  </thead>
)


export default TableSpecs;
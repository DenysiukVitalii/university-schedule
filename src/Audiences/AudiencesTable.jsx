import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateAudience from './CreateAudience';
import EditAudience from './EditAudience';
import Header from '../shared/Header';
import Actions from '../shared/Actions';

class AudiencesTable extends Component {
  constructor() {
    super();
    this.state = {audiences: [], createModal: false, editModal: false, currentItem: '', alert: null};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
  }

  componentDidMount() {
    this.getAudiences();
  }

  getAudiences() {
    myfetch('audiences')
    .then( data => {  
      this.setState({audiences: data});
    }).catch(error => {console.log('Error!', error);});
  }

  deleteAudience(item) {
    console.log(item);
    myfetch('delete_audience', 'delete', item)
    .then((data) => {
      if (data.success) {
        this.setState({audiences: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this audience!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let audiences = this.state.audiences;
    let ids = audiences.map(i => i.id);
    let index = ids.indexOf(item.id);
    audiences.splice(index, 1);
    return audiences;
  }

  closeCreateModal() {
    this.setState({ createModal: false });
  }

  async openCreateModal() {
    await this.setState({ createModal: true });
  }

  closeEditModal() {
    this.setState({ editModal: false, currentItem: '' });
  }

  async openEditModal(item) {
    await this.setState({ editModal: true, currentItem: item });
    console.log(this.state.currentItem);
  }

  // methods for alert
  hideAlert(state) {
    if (!state) {
      this.setState({
        alert: null
      });
    } else {
      this.setState({
        alert: null,
        editModal: false
      });
    }
    
  }

  callAlert(value) {
    this.setState({
      alert: value
    });
  }

  dataAfterCreate(data) {
    this.getAudiences();
  }
  
  dataAfterEdit(data) {
    let audiences = this.state.audiences;
    audiences = audiences.map(e => (e.id === data.id) ? data : e);
    this.setState({audiences: audiences});
  }

  render() {
    return (
      <div className="container">
        <Header title="Audiences" button="Create audience" click={this.openCreateModal} />
         <main>
            <Table audiences={this.state.audiences} 
                    openEditModal={(e) => this.openEditModal(e)}
                    deleteSubject={(e) => this.deleteAudience(e)}/>
              {this.state.alert}
        </main>
        <CreateAudience show={this.state.createModal} hide={this.closeCreateModal}
                       alert={this.callAlert} hideAlert={this.hideAlert}
                       response={this.dataAfterCreate}/>
        <EditAudience show={this.state.editModal} hide={this.closeEditModal} 
                   alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                   item={this.state.currentItem} response={this.dataAfterEdit}/>
      </div>
    );
  }
}

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.audiences.map(e => (
              <tr key={e.id} align="center">
                <td>{e.number_audience}</td>
                <td>{e.building}</td>
                <td>{e.amount_seats}</td>
                <Actions edit={() => props.openEditModal(e)}
                         delete={() => props.deleteSubject(e)}/>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Number</td>
          <td>Building</td>
          <td>Amount seats</td>
          <td>Actions</td>
      </tr>
    </thead>
  )

export default AudiencesTable;
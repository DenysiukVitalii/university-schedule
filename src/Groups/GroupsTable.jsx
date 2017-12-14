import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateGroup from './CreateGroup';
import EditGroup from './EditGroup';
import Header from '../shared/Header';
import Actions from '../shared/Actions';
import InputText from '../shared/InputText';

class GroupsTable extends Component {
  constructor() {
    super();
    this.state = {groups: [], specs: [], createModal: false, editModal: false,
                  currentItem: '', alert: null, filter_spec: 0, filter_year: 0,
                  amount: 'unsort', search_group: ''};
    this.openCreateModal = this.openCreateModal.bind(this);
    this.closeCreateModal = this.closeCreateModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.callAlert = this.callAlert.bind(this); 
    this.hideAlert = this.hideAlert.bind(this);
    this.dataAfterCreate = this.dataAfterCreate.bind(this);
    this.dataAfterEdit = this.dataAfterEdit.bind(this);
    this.specFilterChange = this.specFilterChange.bind(this);
    this.yearFilterChange = this.yearFilterChange.bind(this);
    this.maxAmountFilterChange = this.maxAmountFilterChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.getSpecialties();
    this.getGroups();
  }

  getGroups() {
    myfetch('')
    .then( data => {  
      this.setState({ groups: data });
    }).catch(error => {console.log('Error!', error);});
  }

  getSpecialties() {
    myfetch('all_specs')
    .then( data => { 
      this.setState({ specs: data });
    }).catch(error => {console.log('Error!', error);});
  }

  deleteGroup(item) {
    myfetch('delete_group', 'delete', item)
    .then((data) => {
      if (data.success) {
        this.setState({groups: this.deletedItem(item) });
      } else {
        const getError = () => (
          <SweetAlert error title="Error" onConfirm={this.hideAlert}>
            You can't delete this group!
          </SweetAlert>
        );
        this.setState({
          alert: getError()
        });
      }
    });
  }

  deletedItem(item) {
    let groups = this.state.groups;
    let ids = groups.map(i => i.id);
    let index = ids.indexOf(item.id);
    groups.splice(index, 1);
    return groups;
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
    this.getGroups();
  }

  dataAfterEdit(data) {
    let groups = this.state.groups;
    let specs = this.state.specs;
    groups = groups.map(e => {
      if (e.id === data.id)  {
        data.id = data.newName;
        delete data.newName;
        specs.forEach(spec => {
          if (data.specialtyID === spec.id) data.spec_name = spec.spec_name;
        });
        return data;
      } else {
        return e;
      }
    });
    this.setState({groups: groups});
  }

  specFilterChange(e) {
    let id = +e.target.getAttribute('data-id');
    this.setState({filter_spec: id});
  }

  yearFilterChange(e) {
    let id = +e.target.getAttribute('data-id');
    this.setState({filter_year: id});
  }

  maxAmountFilterChange(e) {
    let amount = e.target.getAttribute('data-id');
    this.setState({amount: amount});
  }

  onSearchChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    let groups = this.state.groups.slice();
    let filteredGroups = filter(this.state.filter_spec, 
                                this.state.filter_year, 
                                this.state.search_group, 
                                this.state.amount, 
                                groups);
                               /* (() => {
      if (this.state.filter_spec && this.state.filter_year) {
        return groups.filter(e => e.specialtyID === this.state.filter_spec && e.course === this.state.filter_year)
      } else
      if (this.state.filter_spec) {
        return groups.filter(e => e.specialtyID === this.state.filter_spec)
      } else 
      if (this.state.search_group !== '') {
        return groups.filter(e => e.id.indexOf(this.state.search_group) !== -1)
      } else 
      if (this.state.filter_year !== 0) {
         return groups.filter(e => e.course === this.state.filter_year)
      } else 
      if (this.state.amount.length) {
        if (this.state.amount === 'unsort') {
          return this.state.groups;
        } else
        if (this.state.amount === 'max') {
          return groups.sort((a, b) => b.amount_students - a.amount_students);
        } else 
        if (this.state.amount === 'min') {
          return groups.sort((a, b) => a.amount_students - b.amount_students);
        } 
      } else {
        return this.state.groups;
      }
    })();*/
    return (
      <div className="container">
        <Header title="Groups" button="Create group" click={this.openCreateModal}/>

        <main className="main-groups">
          <aside>
            <InputText name="search_group" label="Search group" placeholder="Searching..." 
                      value={this.state.search_group} change={this.onSearchChange} 
                      refProp={el => this.inputSearchGroup = el}/>
            <div className="form-group">
                <label>Specialty filter</label>
                <div className="radio">
                  <label><input type="radio" 
                                name="optradio"
                                data-id={0}
                                defaultChecked={true}
                                onChange={this.specFilterChange}/>All</label>
                </div>
                {this.state.specs.map(e => (
                  <div className="radio" key={e.id}>
                    <label><input type="radio" 
                                  name="optradio"
                                  data-id={e.id} 
                                  onChange={this.specFilterChange}/>{e.spec_name}</label>
                  </div>
                ))}
               
            </div>
            <div className="form-group">
                <label>Year filter</label>
                <div className="radio">
                  <label><input type="radio" 
                                name="yearradio"
                                data-id={0}
                                defaultChecked={true}
                                onChange={this.yearFilterChange}/>All</label>
                </div>
                {[1,2,3,4,5,6].map(e => (
                  <div className="radio" key={e}>
                    <label><input type="radio" 
                                  name="yearradio"
                                  data-id={e} 
                                  onChange={this.yearFilterChange}/>{e}</label>
                  </div>
                ))}
               
            </div>
            <label>Sort by amount students</label>
            <div className="radio">
              <label><input type="radio"
                            name="sortradio" 
                            data-id={'unsort'}
                            defaultChecked={true}
                            onChange={this.maxAmountFilterChange}/>Unsort</label>
            </div>
            <div className="radio">
              <label><input type="radio"
                            name="sortradio" 
                            data-id={'max'}
                            onChange={this.maxAmountFilterChange}/>Max -> Min</label>
            </div>
            <div className="radio">
              <label><input type="radio" 
                            name="sortradio" 
                            data-id={'min'}
                            onChange={this.maxAmountFilterChange}/>Min -> Max</label>
            </div>
          </aside>
          <Table groups={filteredGroups} 
                  openEditModal={(e) => this.openEditModal(e)}
                  deleteGroup={(e) => this.deleteGroup(e)}/>
        </main>
        {this.state.alert}
        <CreateGroup show={this.state.createModal} hide={this.closeCreateModal}
                    alert={this.callAlert} hideAlert={this.hideAlert}
                    response={this.dataAfterCreate} specialties={this.state.specs} />
        <EditGroup show={this.state.editModal} hide={this.closeEditModal} 
                   alert={this.callAlert} hideAlert={(e) => this.hideAlert(e)}
                   item={this.state.currentItem} response={this.dataAfterEdit}
                   specialties={this.state.specs} />
      </div>
    );
  }
}

const Table = props => (
  <table className="table table-hover">
      <Thead />
      <tbody>
      {props.groups.map(e => (
              <tr key={e.id} align="center">
                <td>{e.id}</td>
                <td>{e.spec_name}</td>
                <td><b>{e.course}</b> <i>({e.course * 2 - 1}, {e.course * 2})</i></td>
                <td>{e.amount_students}</td>
                <Actions edit={() => props.openEditModal(e)}
                          delete={() => props.deleteGroup(e)}/>
              </tr>
            ))}
      </tbody>
  </table>
);

const Thead = () => (
    <thead align="center" className="blue-background bold">
      <tr>
          <td>Group</td>
          <td>Specialty</td>
          <td>Year (Semesters)</td>          
          <td>Amount students</td>
          <td>Actions</td>
      </tr>
    </thead>
  )
  
  const filter = (filter_spec, filter_year, search_group, amount, groups) => {
    if (filter_spec && filter_year) {
      return groups.filter(e => e.specialtyID === filter_spec && e.course === filter_year)
    } else
    if (filter_spec) {
      return groups.filter(e => e.specialtyID === filter_spec)
    } else 
    if (search_group !== '') {
      return groups.filter(e => e.id.indexOf(search_group) !== -1)
    } else 
    if (filter_year !== 0) {
       return groups.filter(e => e.course === filter_year)
    } else 
    if (amount.length) {
      if (amount === 'unsort') {
        return groups;
      } else
      if (amount === 'max') {
        return groups.sort((a, b) => b.amount_students - a.amount_students);
      } else 
      if (amount === 'min') {
        return groups.sort((a, b) => a.amount_students - b.amount_students);
      } 
    } else {
      return groups;
    }
  };
  
export default GroupsTable;
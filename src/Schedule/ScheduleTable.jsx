import React, { Component } from 'react';
/*import SweetAlert from 'react-bootstrap-sweetalert';
import myfetch from '../myfetch';
import CreateCurriculum from './CreateCurriculum';
import EditCurriculum from './EditCurriculum';
import Actions from '../shared/Actions';*/
import Header from '../shared/Header';

class ScheduleTable extends Component {
  render() {
    return (
      <div className="container">
        <Header title="Schedule" button="Create schedule" click={this.openCreateModal}/>
        <main>
        </main>
      </div>
    );
  }
}

export default ScheduleTable;
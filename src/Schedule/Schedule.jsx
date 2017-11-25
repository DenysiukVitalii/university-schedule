import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ScheduleTable from './ScheduleTable';

class Schedule extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/schedule" component={ScheduleTable}/>
        </Switch>
    );
  }
}

export default Schedule;

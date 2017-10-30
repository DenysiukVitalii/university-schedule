import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TeachersTable from './TeachersTable';

class Teachers extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/teachers" component={TeachersTable}/>
        </Switch>
    );
  }
}


export default Teachers;
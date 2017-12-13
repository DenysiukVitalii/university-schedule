import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AudiencesTable from './SubjectsTable';

class Audiences extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/audiences" component={AudiencesTable}/>
        </Switch>
    );
  }
}


export default Audiences;
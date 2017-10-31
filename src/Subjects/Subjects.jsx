import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SubjectsTable from './SubjectsTable';

class Subjects extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/subjects" component={SubjectsTable}/>
        </Switch>
    );
  }
}


export default Subjects;
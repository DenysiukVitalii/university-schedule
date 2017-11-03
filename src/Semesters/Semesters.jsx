import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SemestersTable from './SemestersTable';

class Semesters extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/semesters" component={SemestersTable}/>
        </Switch>
    );
  }
}


export default Semesters;
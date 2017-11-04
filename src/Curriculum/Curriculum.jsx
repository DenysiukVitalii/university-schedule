import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CurriculumTable from './CurriculumTable';

class Curriculum extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/curriculum" component={CurriculumTable}/>
        </Switch>
    );
  }
}

export default Curriculum;

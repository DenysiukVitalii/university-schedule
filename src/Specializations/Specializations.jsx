import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TableSpecs from './TableSpecs';
import CreateSpec from './CreateSpec';
import './specs.css';

class Specializations extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/specs" component={TableSpecs}/>
        </Switch>
    );
  }
}



export default Specializations;
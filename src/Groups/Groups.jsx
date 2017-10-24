import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import GroupsTable from './GroupsTable';

class Groups extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/groups" component={GroupsTable}/>
        </Switch>
    );
  }
}


export default Groups;
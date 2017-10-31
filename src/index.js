import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App/App';
import Admin from './Admin/Admin';

import TableSpecs from './Specializations/TableSpecs';
import GroupsTable from './Groups/GroupsTable';
import TeachersTable from './Teachers/TeachersTable';
import SubjectsTable from './Subjects/SubjectsTable';
import CreateSpec from './Specializations/CreateSpec';

ReactDOM.render(( 
   <BrowserRouter className="container">
     <Switch>
       <Route exact path="/" component={App}/>
       <Route path="/admin" component={Admin}/>

       <Route path="/specs" component={TableSpecs}/>
       <Route path='/newspec' component={CreateSpec}/>
       <Route path='/groups' component={GroupsTable}/>
       <Route path='/teachers' component={TeachersTable}/>
       <Route path='/subjects' component={SubjectsTable}/>
     </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
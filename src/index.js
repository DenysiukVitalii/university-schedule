import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Admin from './Admin';

ReactDOM.render(( 
   <BrowserRouter className="container">
     <Switch>
       <Route exact path="/" component={App}/>
       <Route path="/admin" component={Admin}/>
     </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
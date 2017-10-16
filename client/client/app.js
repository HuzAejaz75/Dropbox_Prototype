import React from 'react';
import {render} from 'react-dom';
import App from './components/App'
import Single from './components/Single'
import PhotoGrid from './components/PhotoGrid'
import Register from './components/Register'
import Login from './components/Login'
import FileDashBoard from './components/FileDashBoard'

import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store , {history} from './store';


//import Raven from'raven-js';
//import { sentry_url } from './data/config';

//Raven.config(sentry_url).install();
//console.log(window.doesNotExist.nope);
const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
               <IndexRoute component={Register}></IndexRoute>
              
               <Route path="/login" component={Login}></Route>
               <Route path="/photogrid" component={PhotoGrid}></Route>
               <Route path="/FileDashBoard" component={FileDashBoard}></Route>
               <Route path="/view/:photoid" component={Single}></Route>
            </Route>
        </Router>
    </Provider>
   
)


render(router, document.getElementById('root'));

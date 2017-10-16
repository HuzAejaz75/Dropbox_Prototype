import {createStore, compose} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';

import rootReducer from './reducers/index';
import comments from './data/comments';
import posts from './data/posts';

const register=[{
    registered:false,
    error:null
}]

const login=[{
    verifying:false,
    verified:false,
    token:null,
    user:null,
    error:null
}]

const filedetails=[{
    fileid:null,
    filename: null,
    filepath:null,
    starred: false
}]

const defaultState= {
    posts,
    comments,
    register,
    login,
    filedetails
}

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
const store = createStore(rootReducer,defaultState,enhancers);

export const history = syncHistoryWithStore(browserHistory,store);

export default store;






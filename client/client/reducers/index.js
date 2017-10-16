import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import posts from "./posts";
import comments from "./comments";
import register from "./register";
import login from "./login";
import filedetails from "./filedetails";

const rootReducer = combineReducers({posts,comments,register,login, filedetails,routing:routerReducer});

export default rootReducer;
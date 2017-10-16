import axios from 'axios';
import localstorage from 'local-storage';

function firePost(url,action){
    axios.post(url,action).then(function (response) { 
        console.log("token");
        console.log(response.data.token);
        console.log("user");
        console.log(response.data.user);
        this.props.verifying(response.data.token,response.data.user);
        return response;
         })
         .catch(function (error) {
           console.log(error);
         })
}

var token;
var user;

function setToken(sent){
   token = sent;
}
function getToken(){
 return token;
}

function login(state =[], action){
   /* if(localstorage.get('token') != null){
        localstorage.clear();
    }*/
     
    switch(action.type){
        case 'LOG_IN':
        console.log('here we are');
        
        action.info.then((res)=>{
            console.log("jwt");
            console.log(res.data.token);
           localstorage.set('token',res.data.token);
           localstorage.set('user',res.data.user);
        }
    )
            console.log('this is weird');
            console.log(localstorage.get('token'));
            const newState = JSON.parse(JSON.stringify(state));
            return [{...newState[0],verified:true,
            token:localstorage.get('token'),
            user:localstorage.get('user')}]
    //return {...state,verified:true,token:localstorage.get('token'),user:localstorage.get('user')}  
            break;


    case 'SESSION_DETAILS':
    const statecheck = JSON.parse(JSON.stringify(state));
    return [{...statecheck[0],verified:true,
     token:localstorage.get('token'),
     user:localstorage.get('user')}]
    break;
        default:
         return state;
    }
}
export default login;